import {fetchTasksSaga} from "./tasks-sagas";
import {call, put} from "redux-saga/effects";
import {setAppStatusAC} from "../../app/app-reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../../api/todolists-api";
import {setTasksAC} from "./tasks-reducer";

let response;

beforeEach(() => {

})

test('fetchTasksSaga success flow', () => {
  const todolistId = 'todolistId1'

  const gen = fetchTasksSaga({todolistId})
  expect(gen.next().value).toEqual(put(setAppStatusAC('loading')))
  expect(gen.next().value).toEqual(call(todolistsAPI.getTasks, todolistId))

  let response = {
    data: {
      items: [
        {
          id: "1",
          title: "CSS",
          status: TaskStatuses.New,
          todoListId: todolistId,
          description: '',
          startDate: '',
          deadline: '',
          addedDate: '',
          order: 0,
          priority: TaskPriorities.Low
        }
        ]
    }
  }
  expect(gen.next(response).value).toEqual(put(setTasksAC(response.data.items, todolistId)))
  expect(gen.next().value).toEqual(put(setAppStatusAC('succeeded')))
})