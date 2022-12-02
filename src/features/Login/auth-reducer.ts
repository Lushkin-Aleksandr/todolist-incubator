import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import {authAPI, LoginDataType, ResultCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios from "axios";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.login(data)
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(true))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<ResponseType>(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const res = await authAPI.logout()
        if (res.data.resultCode === ResultCode.OK) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError<ResponseType>(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType