import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
    id: string,
    taskName: string,
    isDone: boolean
}

export type TasksType = {
    [id: string]: TaskType[]
}

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

function App() {
    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: v1(), title: 'What to learn', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter: 'all'},
    // ])
    //
    // // Bll
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), taskName: 'HTML', isDone: true},
    //     {id: v1(), taskName: 'CSS', isDone: true},
    //     {id: v1(), taskName: 'REACT', isDone: false},
    //     {id: v1(), taskName: 'REDUX', isDone: false},
    // ])

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), taskName: "HTML&CSS", isDone: true},
            {id: v1(), taskName: "JS", isDone: true},
            {id: v1(), taskName: "ReactJS", isDone: false},
            {id: v1(), taskName: "Rest API", isDone: false},
            {id: v1(), taskName: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), taskName: "HTML&CSS2", isDone: true},
            {id: v1(), taskName: "JS2", isDone: true},
            {id: v1(), taskName: "ReactJS2", isDone: false},
            {id: v1(), taskName: "Rest API2", isDone: false},
            {id: v1(), taskName: "GraphQL2", isDone: false},
        ]
    });


    const removeTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    };


    const addTask = (todolistId: string, taskName: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), taskName, isDone: false}, ...tasks[todolistId]]})
    };

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id !== taskId ? t : {...t, isDone})})
    }
    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(tl => {
            if (tl.id !== todolistId) return tl;
            return {...tl, filter}
        }))
    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId));
        delete tasks[todolistId];
        console.log(tasks)
    }







    const todolistsElements = todolists.map(tl => {
        const getFilteredTasks = () => {
            switch (tl.filter) {
                case "active":
                    return tasks[tl.id].filter(t => !t.isDone);
                case "completed":
                    return tasks[tl.id].filter(t => t.isDone)
                default:
                    return tasks[tl.id];
            }
        }


        return (

            <TodoList
                key={tl.id}
                todolistId={tl.id}
                title={tl.title}
                tasks={getFilteredTasks()}
                filter={tl.filter}
                removeTask={removeTask}
                addTask={addTask}
                changeStatus={changeStatus}
                changeFilter={changeFilter}
                removeTodolist={removeTodolist}/>
        )
    })



    return (
        <div className="App">
            {todolistsElements}
        </div>
    );
}

export default App;
