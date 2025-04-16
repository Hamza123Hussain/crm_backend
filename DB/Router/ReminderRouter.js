import { Router } from 'express'
import { GetAllCallReminders } from '../Controller/Student/Reminders/GetCallReminders.js'
import { GetAllVisitReminders } from '../Controller/Student/Reminders/GetAllVisitReminders.js'
import { GetAllMeetingReminders } from '../Controller/Student/Reminders/GetMeetingReminders.js'
import { GetMonthlyMeetings } from '../Controller/Student/Reminders/GetMonthlyMeeting.js'
import { GetMonthlyVisitReminders } from '../Controller/Student/Reminders/GetMonthlyVisits.js'
import { GetMonthlyCallReminders } from '../Controller/Student/Reminders/GetMonthlyCallReminders.js'
const ReminderRouter = Router()
ReminderRouter.get('/GetCallReminders', GetAllCallReminders) // No image upload needed
ReminderRouter.get('/GetVisitReminders', GetAllVisitReminders)
ReminderRouter.get('/GetMeetingReminders', GetAllMeetingReminders)
ReminderRouter.get('/GetMonthlyMeetingReminders', GetMonthlyMeetings)
ReminderRouter.get('/GetMonthlyCallsReminders', GetMonthlyCallReminders)
ReminderRouter.get('/GetMonthlyVisitReminders', GetMonthlyVisitReminders)
export default ReminderRouter
