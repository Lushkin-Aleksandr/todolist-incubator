import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@material-ui/core'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { Clear } from '@material-ui/icons'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import s from './Task.module.css'

type TaskPropsType = {
  task: TaskType
  todolistId: string
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
  const onClickHandler = useCallback(
    () => props.removeTask(props.task.id, props.todolistId),
    [props.task.id, props.todolistId]
  )

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked
      props.changeTaskStatus(
        props.task.id,
        newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      )
    },
    [props.task.id, props.todolistId]
  )

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },
    [props.task.id, props.todolistId]
  )

  const taskClass =
    props.task.status === TaskStatuses.Completed ? `${s.task} ${s.doneTask}` : s.task

  return (
    <div key={props.task.id} className={taskClass}>
      <div>
        <Checkbox
          checked={props.task.status === TaskStatuses.Completed}
          color="primary"
          onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      </div>
      <IconButton onClick={onClickHandler}>
        <Clear />
      </IconButton>
    </div>
  )
})
