import { Router } from 'express'
import { CreateNotification } from '../Controller/Notifications/CreateNotifications.js'
import { DeleteNotification } from '../Controller/Notifications/DeleteNotification.js'
import { GetAllNotifcations } from '../Controller/Notifications/GetNotifications.js'

const NotificationRouter = Router()
NotificationRouter.post('/CreateNotification', CreateNotification)
NotificationRouter.delete('/DeleteNotification', DeleteNotification)
NotificationRouter.get('/GetAllNotifications', GetAllNotifcations)
export default NotificationRouter
