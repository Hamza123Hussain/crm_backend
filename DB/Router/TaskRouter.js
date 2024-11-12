import { Router } from 'express'

import { TaskUpdated } from '../Controller/Task/UpdateTask.js'
import { AllTasks } from '../Controller/Task/AllTasks.js'
import { UserTasks } from '../Controller/Task/UserTasks.js'
import { DeleteTask } from '../Controller/Task/DeleteTask.js'
import { GetSingleTask } from '../Controller/Task/GetSingleTask.js'
import { MarkDone } from '../Controller/Task/MarkDone.js'
import { createTask } from '../Controller/Task/CreateTask.js'

const TaskRouter = Router()

TaskRouter.post('/CreateNewTask', createTask)
TaskRouter.put('/UpdateTask', TaskUpdated)
TaskRouter.get('/AllTasks', AllTasks)
TaskRouter.get('/GetUserTasks', UserTasks)
TaskRouter.delete('/DeleteTask', DeleteTask)
TaskRouter.get('/singleTask', GetSingleTask)
TaskRouter.put('/MarkDone', MarkDone)
export default TaskRouter
