import express from 'express'
import cors from 'cors'
import { Port } from './Config.js'

import AuthRouter from './DB/Routes/Auth/AuthController.js'
import ProductRouter from './DB/Routes/Product/ProductRouter.js'
import CategoryRouter from './DB/Routes/Catorgory/Category.js'
import UserRouter from './DB/Routes/User/UserRouter.js'
const app = express()
// Enable CORS for all origins
const corsOptions = {
  origin: true, // Allow all origins https://notes-app-node-next-9x72.vercel.app/
  optionsSuccessStatus: 200, // For legacy browser support
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/category', CategoryRouter)
app.use('/api/Product', ProductRouter)
app.use('/api/Auth', AuthRouter)
app.use('/api/Users', UserRouter)
app.listen(Port, () => {
  console.log('RUNNING ON PORT 8000')
})
