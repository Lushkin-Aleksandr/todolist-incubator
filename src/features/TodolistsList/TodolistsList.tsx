import React, {useCallback, useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType
} from './todolists-reducer'
import {TasksStateType} from './tasks-reducer'
import {TaskStatuses} from '../../api/todolists-api'
import {Grid, Paper} from '@material-ui/core'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm'
import {Todolist} from './Todolist/Todolist'
import {Redirect} from 'react-router-dom'
import {addTask, removeTask, updateTask} from "./tasks-sagas";

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return;
    }
    const thunk = fetchTodolistsTC()
    dispatch(thunk)
  }, [])

  const handleRemoveTask = useCallback(function (id: string, todolistId: string) {
    dispatch(removeTask(id, todolistId))
  }, [])

  const handleAddTask = useCallback(function (title: string, todolistId: string) {

    dispatch(addTask(title, todolistId))
  }, [])

  const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
    const thunk = updateTask(id, {status}, todolistId)
    dispatch(thunk)
  }, [])

  const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
    const thunk = updateTask(id, {title: newTitle}, todolistId)
    dispatch(thunk)
  }, [])

  const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(todolistId, value)
    dispatch(action)
  }, [])

  const removeTodolist = useCallback(function (id: string) {
    const thunk = removeTodolistTC(id)
    dispatch(thunk)
  }, [])

  const changeTodolistTitle = useCallback(function (id: string, title: string) {
    const thunk = changeTodolistTitleTC(id, title)
    dispatch(thunk)
  }, [])

  const addTodolist = useCallback((title: string) => {
    const thunk = addTodolistTC(title)
    dispatch(thunk)
  }, [dispatch])

  const todolistsContainerRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = todolistsContainerRef.current
    const page = pageRef.current

    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      container!.scrollLeft += e.deltaY
    }
    page!.addEventListener('wheel', handleScroll)

    return () => {
      page!.removeEventListener('wheel', handleScroll)
    }
  }, []);

  if (!isLoggedIn) {
    return <Redirect to={"/login"}/>
  }

  return <div ref={pageRef} style={{height: '100%', padding: '20px', display: "flex", flexDirection: 'column'}}>
    <div style={{maxWidth: '250px', marginBottom: '20px'}}>
      <AddItemForm addItem={addTodolist}/>
    </div>
    <div ref={todolistsContainerRef} style={{flex: '1', display: 'flex', alignItems: 'flex-start', gap: '20px', overflowX: 'scroll', padding: '5px'}}>
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]

          return <Paper key={tl.id} elevation={3} style={{padding: '10px', flex: '1 0 auto'}}>
            <Todolist
              todolist={tl}
              tasks={allTodolistTasks}
              removeTask={handleRemoveTask}
              changeFilter={changeFilter}
              addTask={handleAddTask}
              changeTaskStatus={changeStatus}
              removeTodolist={removeTodolist}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
              demo={demo}
            />
          </Paper>
        })
      }
    </div>
  </div>
}
