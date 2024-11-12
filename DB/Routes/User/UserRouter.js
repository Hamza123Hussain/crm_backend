import { Router } from 'express'

import { GetUsers } from '../../Controllers/Fetch/GetUsers.js'
const UserRouter = Router()

UserRouter.get('/Get', GetUsers)

export default UserRouter
