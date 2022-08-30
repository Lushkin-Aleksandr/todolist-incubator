import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    taskName: string,
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed';

function App() {
    // Bll
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), taskName: 'HTML', isDone: true},
        {id: v1(), taskName: 'CSS', isDone: true},
        {id: v1(), taskName: 'REACT', isDone: false},
        {id: v1(), taskName: 'REDUX', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all');

    const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));
    const addTask = (taskName: string) => setTasks([{id: v1(), taskName, isDone: false}, ...tasks]);
    const getFilteredTasks = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone);
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks;
        }
    }


    const filteredTasks: Array<TaskType> = getFilteredTasks();


    // UI
    return (
        <div className="App">
            <TodoList
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={(filter) => setFilter(filter)}/>
        </div>
    );
}

export default App;
