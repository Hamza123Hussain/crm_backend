import express, { json } from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
import StudentRouter from './DB/Router/StudentRouter.js'
import OtpRouter from './DB/Router/OtpRouter.js'
import { PORT } from './Config.js'
import { GemniRouter } from './DB/Router/GemniRouter.js'
import InternRouter from './DB/Router/InternRouter.js'
import NotificationRouter from './DB/Router/NotificationRouter.js'
import ReminderRouter from './DB/Router/ReminderRouter.js'
import NotesRouter from './DB/Router/NotesRouter.js'
import { TransactionRouter } from './DB/Router/TransactionRouter.js'
const app = express()
// Body-parser middleware to parse JSON and URL-encoded data
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse form data if needed
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
}
app.set('trust proxy', true)
app.use(cors(corsOptions))
app.use('/Api/Auth', AuthRouter)
app.use('/Api/Student', StudentRouter)
app.use('/Api/Otp', OtpRouter)
app.use('/Api/Gemni', GemniRouter)
app.use('/Api/Intern', InternRouter)
app.use('/Api/Notification', NotificationRouter)
app.use('/Api/Reminder', ReminderRouter)
app.use('/Api/Notes', NotesRouter)
app.use('/Api/Transaction', TransactionRouter)
DB_CONNECTED()
app.listen(PORT, () => {
  console.log('port is on')
})
