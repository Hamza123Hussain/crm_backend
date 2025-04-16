import { Router } from 'express'
import { CreateNotification } from '../Controller/Notifications/CreateNotifications.js'
import { DeleteNotification } from '../Controller/Notifications/DeleteNotification.js'
import { GetAllNotifcations } from '../Controller/Notifications/GetNotifications.js'
import { GetMonthlyNotifcations } from '../Controller/Notifications/GetMonthlyNotifications.js'

const NotificationRouter = Router()
NotificationRouter.post('/CreateNotification', CreateNotification)
NotificationRouter.delete('/DeleteNotification', DeleteNotification)
NotificationRouter.get('/GetAllNotifications', GetAllNotifcations)
NotificationRouter.get('/GetMonthlyNotifications', GetMonthlyNotifcations)
export default NotificationRouter
