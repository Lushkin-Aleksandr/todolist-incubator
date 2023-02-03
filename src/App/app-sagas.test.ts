import {initializeAppWorkerSaga} from "./app-sagas";
import {call, put} from "redux-saga/effects";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setAppInitializedAC} from "./app-reducer";

let meResponse: {
  data: {
      resultCode: number
    }
}

beforeEach(() => {
  meResponse = {data: {resultCode: 0}}
})

test('initializeAppWorkerSaga login success', () => {
  const gen = initializeAppWorkerSaga()
  expect(gen.next().value).toEqual((call(authAPI.me)))
  expect(gen.next(meResponse).value).toEqual(put(setIsLoggedInAC(true)))
  expect(gen.next().value).toEqual(put(setAppInitializedAC(true)))
})

test('initializeAppWorkerSaga login unsuccess', () => {
  const gen = initializeAppWorkerSaga()
  expect(gen.next().value).toEqual((call(authAPI.me)))

  meResponse.data.resultCode = 1

  expect(gen.next(meResponse).value).toEqual(put(setAppInitializedAC(true)))
  expect(gen.next().value).toEqual(undefined)
})