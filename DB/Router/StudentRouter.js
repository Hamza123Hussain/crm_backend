import { Router } from 'express'
import { createStudent } from '../Controller/Student/CreateAStudent.js'
import { updateStudentDetails } from '../Controller/Student/UpdateStudent.js'
import { GetNEWStudents } from '../Controller/Student/GetNewStudents.js'
import { GetSignedUpStudents } from '../Controller/Student/GetSignedStudents.js'
import { GetPotientialStudents } from '../Controller/Student/GetPotentialStudents.js'
import { GetNotInterestedStudents } from '../Controller/Student/GetNotInterested.js'
import { GetAllStudents } from '../Controller/Student/GetAllStudents.js'
import { GetDummyStudents } from '../Controller/Test/GetStudents.js'
const StudentRouter = Router()
// POST endpoint for user registration (without image upload)
StudentRouter.post('/NewStudent', createStudent)
StudentRouter.put('/UpdateStudent', updateStudentDetails)
StudentRouter.get('/GetNewStudents', GetNEWStudents)
StudentRouter.get('/GetSignedUpStudents', GetSignedUpStudents)
StudentRouter.get('/GetPotientialStudents', GetPotientialStudents)
StudentRouter.get('/GetNotInterested', GetNotInterestedStudents)
StudentRouter.get('/GetAllStudents', GetAllStudents)
StudentRouter.get('/GetDummy', GetDummyStudents)
export default StudentRouter
