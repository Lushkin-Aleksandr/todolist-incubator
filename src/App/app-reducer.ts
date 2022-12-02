import {AppThunkDispatch} from "./store";
import axios from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI, ResultCode} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    initialized: false,
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, initialized: action.initialized}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    initialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

export const initializeAPP = () => async (dispatch: AppThunkDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.me()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setInitializedAC(true))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInitializedActionType
