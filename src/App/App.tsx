import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import {BrowserRouter, Route} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {logoutTC} from '../features/Login/auth-reducer'
import {initializeApp} from "./app-sagas";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <Typography variant="h6">
                            Todo
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <main style={{flex: '1'}}>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
