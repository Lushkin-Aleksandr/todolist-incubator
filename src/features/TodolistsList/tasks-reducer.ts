import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {AppRootStateType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";
import {AxiosError} from "axios";


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))

    const res = await todolistsAPI.getTasks(todolistId)
    const tasks = res.data.items

    thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))

    return {tasks, todolistId}
})

export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { taskId: string, todolistId: string }) => {
    await todolistsAPI.deleteTask(param.todolistId, param.taskId)

    return {taskId: param.taskId, todolistId: param.todolistId}
})

export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { title: string, todolistId: string }, thunkApi) => {
    try {
        thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, thunkApi.dispatch);
            return thunkApi.rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e as AxiosError, thunkApi.dispatch)
        return thunkApi.rejectWithValue(null)

    }
})

export const updateTaskTC = createAsyncThunk(
    'tasks/updateTask',
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
        try {
            const state = thunkAPI.getState() as AppRootStateType
            const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
            if (!task) {
                return thunkAPI.rejectWithValue('task not found in the state')
            }

            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...param.model
            }

            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
            if (res.data.resultCode === 0) {
                return param
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch);
                return thunkAPI.rejectWithValue(null)
            }
        } catch (e) {
            handleServerNetworkError(e as AxiosError, thunkAPI.dispatch);
            return thunkAPI.rejectWithValue(null)
        }
    })


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.forEach(tl => {
                    state[tl.id] = []
                })
            })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.todolistId] = [...action.payload.tasks]
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                state[action.payload.todolistId].splice(state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId), 1)
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift(action.payload)
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId)
                if (index !== -1) {
                    state[action.payload.todolistId][index] = {...state[action.payload.todolistId][index], ...action.payload.model}
                }
            })

    }
})

export const tasksReducer = tasksSlice.reducer
