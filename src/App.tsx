import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterType = 'all' | 'active' | 'complete';

function App() {
    // Bll
    const todolistTitle_1: string = 'Tasks';

    const [filter, setFilter] = useState<FilterType>('all');
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, taskName: 'HTML&CSS', isDone: true},
        {id: 2, taskName: 'JS', isDone: true},
        {id: 3, taskName: 'React', isDone: false},
    ]);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
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
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
