import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type FilterType = 'All' | 'Active' | 'Completed';

function App() {
    //BLL
    const todoListTitle_1: string = 'What to learn today?';
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 3, title: 'JS&TS', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('All');

    const changeFilter = (filterName:FilterType) => {
        setFilter(filterName);
    }

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const getTasksForTodoList = () => {

        switch (filter) {
            case "Active":
                return tasks.filter(t => !t.isDone);
            case "Completed":
                return tasks.filter(t => t.isDone);
            default:
                return tasks;
        }
    }

    //UI
    return (
        <div className="App">
            <TodoList
                title={todoListTitle_1}
                tasks={getTasksForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*<TodoList title='Costs'/>*/}
        </div>
    );
}

export default App;
