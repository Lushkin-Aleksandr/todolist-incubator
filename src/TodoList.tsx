import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodoListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    addTask: (taskName: string) => void
    changeFilter: (filterValue: FilterType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [inputValue, setInputValue] = useState<string>('');

    const tasks = !props.tasks.length
        ? <span>Add first task</span>
        : props.tasks.map(t => {
            const onRemoveTaskBtnClick = () => props.removeTask(t.id)

            return (
                <li key={t.id}>
                    <input type={"checkbox"} checked={t.isDone}/>
                    <span>{t.taskName} </span>
                    <button onClick={onRemoveTaskBtnClick}>x</button>
                </li>
            )
        })

    const addTask = () => {
            props.addTask(inputValue);
            setInputValue('');
    }

    const inputEnterKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask();
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value);




    return (
        <div>
            <div>
                <h3>Title</h3>
                <div>
                    <input onChange={changeInputValue} onKeyDown={inputEnterKeyDownHandler} value={inputValue}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;