import {call, put, select, takeEvery} from "redux-saga/effects";
import {todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {setAppStatusAC} from "../../app/app-reducer";
import {
  addTaskAC,
  removeTaskAC,
  setTasksAC,
  TasksStateType,
  UpdateDomainTaskModelType,
  updateTaskAC
} from "./tasks-reducer";
import {handleServerAppErrorForSaga, handleServerNetworkErrorForSaga} from "../../utils/error-utils";
import {AxiosError} from "axios";

export function* fetchTasksSaga(action: any) {
  yield put(setAppStatusAC('loading'))
  const res = yield call(todolistsAPI.getTasks, action.todolistId)
  const tasks = res.data.items
  yield put(setTasksAC(tasks, action.todolistId))
  yield put(setAppStatusAC('succeeded'))
}

export const fetchTasks = (todolistId: string) => ({type: 'TASKS/FETCH-TASKS', todolistId})

export function* removeTaskSaga(action: any) {
  yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId)
  yield put(removeTaskAC(action.taskId, action.todolistId))
}

export const removeTask = (taskId: string, todolistId: string) => ({
  type: 'TASKS/REMOVE-TASK',
  todolistId,
  taskId
})

export function* addTaskSaga(action: any) {
  try {
    yield put(setAppStatusAC('loading'))
    const res = yield call(todolistsAPI.createTask, action.todolistId, action.title)
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      yield put(addTaskAC(task))
      yield put(setAppStatusAC('succeeded'))
    } else {
      handleServerAppErrorForSaga(res.data, put);
    }
  } catch (e) {
    handleServerNetworkErrorForSaga(e as AxiosError, put)
  }
}

export const addTask = (title: string, todolistId: string) => ({type: 'TASKS/ADD-TASK', title, todolistId})

export function* updateTaskSaga({taskId, domainModel, todolistId}: any) {
  try {
    const tasks: TasksStateType = yield select(state => state.tasks)
    const task = tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel
    }

    const res = yield call(todolistsAPI.updateTask, todolistId, taskId, apiModel)
    if (res.data.resultCode === 0) {
      const action = updateTaskAC(taskId, domainModel, todolistId)
      yield put(action)
    } else {
      handleServerAppErrorForSaga(res.data, put);
    }
  } catch (e) {
    handleServerNetworkErrorForSaga(e, put);
  }
}

export const updateTask = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => ({
  type: 'TASKS/UPDATE-TASK',
  taskId,
  domainModel,
  todolistId
})

export function* tasksWatcherSaga() {
  yield takeEvery('TASKS/FETCH-TASKS', fetchTasksSaga)
  yield takeEvery('TASKS/REMOVE-TASK', removeTaskSaga)
  yield takeEvery('TASKS/ADD-TASK', addTaskSaga)
  yield takeEvery('TASKS/UPDATE-TASK', updateTaskSaga)
}