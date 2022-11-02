import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        task: {id: '2', isDone: true, title: 'CSS'},
        todolistId: '1'
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDone.args = {};

export const TaskIsNotDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDone.args = {
    task: {id: '2', isDone: false, title: 'CSS'},
};




