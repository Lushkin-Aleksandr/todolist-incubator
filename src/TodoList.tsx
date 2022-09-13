import React, {KeyboardEvent, ChangeEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";

type TodoListPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, taskName: string) => void
    changeFilter: (todolistId: string, filterValue: FilterType) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null)

    const tasks = !props.tasks.length
        ? <span>Add first task</span>
        : props.tasks.map(t => {
            const onRemoveTaskBtnClick = () => props.removeTask(props.todolistId, t.id)


            return (
                <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                    <input
                        type={"checkbox"}
                        checked={t.isDone}
                        onChange={(e) => props.changeStatus(props.todolistId, t.id, e.currentTarget.checked)}/>
                    <span>{t.taskName} </span>
                    <button onClick={onRemoveTaskBtnClick}>x</button>
                </li>
            )
        })

    const addTask = () => {
        const trimmedInputValue = inputValue.trim();
        if (!trimmedInputValue) {
            setError('Required');
            return;
        }

            props.addTask(props.todolistId, trimmedInputValue);
            setInputValue('');
    }

    const removeTodolist = () => {
            props.removeTodolist(props.todolistId);
    }

    const inputEnterKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask();
    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setInputValue(e.currentTarget.value)
    };




    return (
        <div>
            <div>
                <h3>
                    {props.title} <button onClick={removeTodolist}>x</button>
                </h3>

                <div>
                    <input
                        className={error ? 'requiredError' : ''}
                        onChange={changeInputValue}
                        onKeyDown={inputEnterKeyDownHandler}
                        value={inputValue}/>
                    {error && <span className={'errorText'}>Required</span>}
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasks}
                </ul>
                <div>
                    <button
                        className={props.filter === 'all' ? 'activeBtn btn' : 'btn'}
                        onClick={() => props.changeFilter(props.todolistId, 'all')}>All</button>
                    <button
                        className={props.filter === 'active' ? 'activeBtn btn' : 'btn'}
                        onClick={() => props.changeFilter(props.todolistId, 'active')}>Active</button>
                    <button
                        className={props.filter === 'completed' ? 'activeBtn btn' : 'btn'}
                        onClick={() => props.changeFilter(props.todolistId, 'completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;