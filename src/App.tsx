import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {log} from "util";
import {v1} from "uuid";


export type FilterType = 'all' | 'active' | 'complete';

function App() {
    // Bll
    const todolistTitle_1: string = 'Tasks';

    const [filter, setFilter] = useState<FilterType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), taskName: 'HTML&CSS', isDone: true},
        {id: v1(), taskName: 'JS', isDone: false},
        {id: v1(), taskName: 'React', isDone: false},
        {id: v1(), taskName: 'Redux', isDone: true},
    ]);

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), taskName: title, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    const changeFilter = (filterValue: FilterType) => {
        setFilter(filterValue);
    }

    const getTasksForTodoList = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "complete":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }


    // UI
    return (
        <div className="App">
            <TodoList
                title={todolistTitle_1}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
