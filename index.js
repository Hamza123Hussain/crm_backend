import express, { json } from 'express'
import { DB_CONNECTED } from './DB_Connect.js'
import cors from 'cors'
import AuthRouter from './DB/Router/AuthRouter.js'
import { PORT } from './Config.js'
import StudentRouter from './DB/Router/StudentRouter.js'
import OtpRouter from './DB/Router/OtpRouter.js'
const app = express()
// Body-parser middleware to parse JSON and URL-encoded data
app.use(express.json()) // To parse JSON bodies
app.use(express.urlencoded({ extended: true })) // To parse form data if needed
const corsOptions = {
  origin: '*', // Allow requests from any origin; adjust as needed for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
}
app.use(cors(corsOptions))
app.use('/Api/Auth', AuthRouter)
app.use('/Api/Student', StudentRouter)
app.use('/Api/Otp', OtpRouter)
DB_CONNECTED()
app.listen(PORT, () => {
  console.log('port is on')
})
