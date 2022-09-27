import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./components/Input";
import {EditableSpan} from "./components/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTask: (todolistId: string, taskID: string, currentTitle: string) => void
    editTodolist: (todolistId: string, currentTitle: string) => void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskhandler = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const editTodolistHandler = (currentTitle: string) => {
        props.editTodolist(props.id, currentTitle);
    }

    const changeTaskHandler = (taskId: string, currentTitle: string) => {
        props.changeTask(props.id, taskId, currentTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={editTodolistHandler}/>
            <IconButton onClick={removeTodolist} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>

        <Input callBack={addTaskhandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      callBack={(currentTitle: string) => changeTaskHandler(t.id, currentTitle)}/>
                        <IconButton onClick={onClickHandler} aria-label="delete">
                            <Delete/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <ButtonGroup
                color={'primary'}>
                <Button
                    variant={'contained'}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={'contained'}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}


