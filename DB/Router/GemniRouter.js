import { Router } from 'express'
import { Messageme } from '../Controller/Chatbot/SendMessage.js'

export const GemniRouter = Router()
GemniRouter.post('/SendMessage', Messageme)
