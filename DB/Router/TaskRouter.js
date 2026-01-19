import { Router } from 'express'
import { deleteTask } from '../Controller/Task/DeleteTask.js'
import { getTasksGroupedByDate } from '../Controller/Task/GetTasks.js'
import { addTask } from '../Controller/Task/AddTask.js'
import { updateTask } from '../Controller/Task/UpdateTask.js'
import { CompleteTask } from '../Controller/Task/CompleteTask.js'
import { AddNote } from '../Controller/Task/AddNote.js'

export const TaskBoardRouter = Router()
TaskBoardRouter.post('/AddTaskDetails', addTask)
TaskBoardRouter.get('/GetAllTasks', getTasksGroupedByDate)
TaskBoardRouter.delete('/DeleteTask', deleteTask)
TaskBoardRouter.put('/UpdateTask', updateTask)
TaskBoardRouter.put('/CompleteTask', CompleteTask)
TaskBoardRouter.put('/AddNotes', AddNote)
