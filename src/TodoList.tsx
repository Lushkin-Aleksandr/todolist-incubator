import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from "./App";


export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [newTaskName, setNewTaskName] = useState('');

    const tasksItems = props.tasks.length
        ? props.tasks.map(t => {
            return (
                <li key={t.id}>
                    <input
                        type="checkbox"
                        checked={t.isDone}/>
                    <span>{t.taskName}</span>
                    <button onClick={() => props.removeTask(t.id)}>x</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value);
    }
    const addTask = () => {
        props.addTask(newTaskName)
        setNewTaskName('')
    }

    const onAddTaskKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const handlerCreator = (filter: FilterType) => () => props.changeFilter(filter)

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        onKeyDown={onAddTaskKeyDown}
                        onChange={onChangeHandler}
                        value={newTaskName}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div>
                    <button onClick={handlerCreator('all')}>All</button>
                    <button onClick={handlerCreator('active')}>Active</button>
                    <button onClick={handlerCreator('complete')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;