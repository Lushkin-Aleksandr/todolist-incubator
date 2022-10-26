import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type PropsType = {
    task: TaskType
    changeTaskStatus: (id: string, isDone: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = React.memo((props: PropsType) => {

    const removeTaskHandler = () => props.removeTask(props.task.id)
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue);
    }
    const changeTaskTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue);
    }


    return (
        <div className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={changeTaskStatusHandler}
            />

            <EditableSpan value={props.task.title} onChange={changeTaskTitleHandler} />
            <IconButton onClick={removeTaskHandler}>
                <Delete />
            </IconButton>
        </div>
    );
});

