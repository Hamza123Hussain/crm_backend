import { Router } from 'express'
import { NewAttendance } from '../Controller/Attendance/NewAttendance.js'
import { UpdateAttendance } from '../Controller/Attendance/UpdateAttendance.js'

import { AllUser } from '../Controller/Attendance/AllUserAttendance.js'
import { UserAttendance } from '../Controller/Attendance/UserAttendance.js'
import { CurrentAttendance } from '../Controller/Attendance/CurrentAttendance.js'
import { UpdateBreak } from '../Controller/Attendance/UpdateBreakStatus.js'

const AttendanceRouter = Router()

AttendanceRouter.post('/NewAttendace', NewAttendance)
AttendanceRouter.post('/UpdateAttendance', UpdateAttendance)
AttendanceRouter.post('/Updatebreak', UpdateBreak)
AttendanceRouter.get('/UserAttendance', UserAttendance)
AttendanceRouter.get('/AllAttendance', AllUser)
AttendanceRouter.get('/CurrentAttendance', CurrentAttendance)
export default AttendanceRouter
