import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC, RemoveTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}


function AppWithRedux() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const todolists = useSelector<AppStateType, TodolistType[]>(state => state.todolists)

  const dispatch = useDispatch()



  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(ChangeTodolistFilterAC(todolistId, value))
  }

  function removeTodolist(id: string) {
    dispatch(RemoveTodolistAC(id))
  }

  function changeTodolistTitle(id: string, title: string) {
    dispatch(ChangeTodolistTitleAC(id, title))
  }

  function addTodolist(title: string) {
    dispatch(AddTodolistAC(title))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {


              return <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
