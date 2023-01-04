import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState: Array<TodolistDomainType> = []

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return res.data
    } catch (e) {
        handleServerNetworkError(e as AxiosError, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    await todolistsAPI.deleteTodolist(todolistId)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    return todolistId
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(title)
    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    return res.data.data.item
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }) => {
    await todolistsAPI.updateTodolist(param.id, param.title)
    return {id: param.id, title: param.title}
})

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const todo = state.find(tl => tl.id === action.payload.id)
            if (todo) todo.filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const todo = state.find(tl => tl.id === action.payload.id)
            if (todo) todo.entityStatus = action.payload.status
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                state.splice(state.findIndex(tl => tl.id === action.payload), 1)
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                const todo = state.find(tl => tl.id === action.payload.id)
                if (todo) todo.title = action.payload.title
            })
    }
})

export const {
    changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
