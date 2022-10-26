import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType


const initialState: TasksStateType = {
  ['todolistId1']: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true}
  ],
  ['todolistId2']: [
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "React Book", isDone: true}
  ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
      }
    }
    case "ADD-TASK": {
      return {
        ...state,
        [action.todolistId]: [{id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todolistId]]
      }
    }
    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          isDone: action.isDone
        } : t)
      }
    }
    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
          ...t,
          title: action.taskTitle
        } : t)
      }
    }
    case "ADD-TODOLIST": {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.id]
      return stateCopy
    }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    todolistId,
    taskId,
  } as const
}

export const addTaskAC = (taskTitle: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    taskTitle,
    todolistId
  } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todolistId
  } as const
}

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskId,
    taskTitle,
    todolistId
  } as const
}


