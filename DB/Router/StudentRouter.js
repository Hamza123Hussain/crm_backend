import { Router } from 'express'
import { createStudent } from '../Controller/Student/CreateAStudent.js'
import { updateStudentDetails } from '../Controller/Student/UpdateStudent.js'

const StudentRouter = Router()

// POST endpoint for user registration (without image upload)

StudentRouter.post('/NewStudent', createStudent)
StudentRouter.put('/UpdateStudent', updateStudentDetails)
export default StudentRouter
