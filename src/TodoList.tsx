import React from 'react';
import {FilterType} from "./App";


export type TaskType = {
    id: number
    taskName: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterType) => void
}

const TodoList = (props: TodoListPropsType) => {

    const tasksItems = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.taskName}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    });

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksItems}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('complete')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;