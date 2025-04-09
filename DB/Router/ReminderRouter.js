import { Router } from 'express'
import { GetAllCallReminders } from '../Controller/Student/Reminders/GetCallReminders.js'
import { GetAllVisitReminders } from '../Controller/Student/Reminders/GetAllVisitReminders.js'
import { GetAllMeetingReminders } from '../Controller/Student/Reminders/GetMeetingReminders.js'
const ReminderRouter = Router()
ReminderRouter.post('/GetCallReminders', GetAllCallReminders) // No image upload needed
ReminderRouter.post('/GetVisitReminders', GetAllVisitReminders)
ReminderRouter.get('/GetMeetingReminders', GetAllMeetingReminders)
export default ReminderRouter
