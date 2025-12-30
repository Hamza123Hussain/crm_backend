import { Router } from 'express'
import { CreateNotification } from '../Controller/Notifications/CreateNotifications.js'
import { DeleteNotification } from '../Controller/Notifications/DeleteNotification.js'
import { GetAllNotifcations } from '../Controller/Notifications/GetNotifications.js'
import { GetMonthlyNotifcations } from '../Controller/Notifications/GetMonthlyNotifications.js'
import { GetSignedUpNotifcations } from '../Controller/Notifications/GetallSignedupNotifications.js'
import { GetYearlyCallReminders } from '../Controller/Student/Reminders/GetYearlyCalls.js'
import { GetYearlyNotifications } from '../Controller/Notifications/GetYearNotifications.js'
import { GetYearlyMeetings } from '../Controller/Student/Reminders/GetYearlyMeetings.js'
import { GetBanglaMonthlyNotifcations } from '../Controller/Student/Reminders/BanglaMonthlyNotifcations.js'

const NotificationRouter = Router()
NotificationRouter.post('/CreateNotification', CreateNotification)
NotificationRouter.delete('/DeleteNotification', DeleteNotification)
NotificationRouter.get('/GetAllNotifications', GetAllNotifcations)
NotificationRouter.get('/GetMonthlyNotifications', GetMonthlyNotifcations)
NotificationRouter.get('/GetSignedUpNotifications', GetSignedUpNotifcations)
NotificationRouter.get('/GetYearlyCallReminders', GetYearlyCallReminders)
NotificationRouter.get('/GetYearlyNotifications', GetYearlyNotifications)
NotificationRouter.get('/GetYearlyMeetings', GetYearlyMeetings)
NotificationRouter.get(
  '/GetBangalMonthlyNotifications',
  GetBanglaMonthlyNotifcations
)
export default NotificationRouter
