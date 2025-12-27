import { Router } from 'express'
import { deleteTask } from '../Controller/Task/DeleteTask.js'
import { getTasksGroupedByDate } from '../Controller/Task/GetTasks.js'
import { addTask } from '../Controller/Task/AddTask.js'

export const TaskBoardRouter = Router()
TaskBoardRouter.post('/AddTaskDetails', addTask)
TaskBoardRouter.get('/GetAllTasks', getTasksGroupedByDate)
TaskBoardRouter.delete('/DeleteTask', deleteTask)
