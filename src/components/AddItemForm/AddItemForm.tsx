import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@material-ui/core'
import { AddBox } from '@material-ui/icons'
import s from './AddItemForm.module.css'

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(function ({
  addItem,
  disabled = false,
}: AddItemFormPropsType) {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title)
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.charCode === 13) {
      addItemHandler()
    }
  }

  return (
    <div className={s.addItemForm}>
      <TextField
        variant="outlined"
        fullWidth
        disabled={disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddBox />
      </IconButton>
    </div>
  )
})
