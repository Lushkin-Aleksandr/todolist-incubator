import React, { useCallback, useEffect } from 'react'
import s from './App.module.css'
import {
  AppBar,
  Button,
  CircularProgress,
  LinearProgress,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootStateType } from './store'
import { RequestStatusType } from './app-reducer'
import { Route } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { logoutTC } from '../features/Login/auth-reducer'
import { initializeApp } from './app-sagas'

type PropsType = {
  demo?: boolean
}

function App({ demo = false }: PropsType) {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [])

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.loaderHolder}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.app}>
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar className={s.toolbar}>
          <Typography variant="h6">Todo</Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <main className={s.main}>
        <Route exact path={'/'} render={() => <TodolistsList demo={demo} />} />
        <Route path={'/login'} render={() => <Login />} />
      </main>
    </div>
  )
}

export default App
