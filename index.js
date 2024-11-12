import express from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
import TaskRouter from './DB/Router/TaskRouter.js'
import AttendanceRouter from './DB/Router/AttendanceRouter.js'
import { PORT } from './Config.js'
const app = express()
app.use(express.json())
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
}
app.use(cors(corsOptions))
app.use('/Api/Auth', AuthRouter)
app.use('/Api/Attendance', AttendanceRouter)
app.use('/Api/Task', TaskRouter)
DB_CONNECTED()
app.listen(PORT, () => {
  console.log('port is on')
})
