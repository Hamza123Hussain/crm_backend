import { Router } from 'express'
import { GetAllCallReminders } from '../Controller/Student/Reminders/GetCallReminders.js'
import { GetAllVisitReminders } from '../Controller/Student/Reminders/GetAllVisitReminders.js'
import { GetAllMeetingReminders } from '../Controller/Student/Reminders/GetMeetingReminders.js'
const ReminderRouter = Router()
ReminderRouter.get('/GetCallReminders', GetAllCallReminders) // No image upload needed
ReminderRouter.get('/GetVisitReminders', GetAllVisitReminders)
ReminderRouter.get('/GetMeetingReminders', GetAllMeetingReminders)
export default ReminderRouter
