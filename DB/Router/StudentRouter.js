import { Router } from 'express'
import { createStudent } from '../Controller/Student/CreateAStudent.js'
import { updateStudentDetails } from '../Controller/Student/UpdateStudent.js'
import { GetNEWStudents } from '../Controller/Student/GetNewStudents.js'
import { GetSignedUpStudents } from '../Controller/Student/GetSignedStudents.js'
import { GetPotientialStudents } from '../Controller/Student/GetPotentialStudents.js'
import { GetNotInterestedStudents } from '../Controller/Student/GetNotInterested.js'
import { GetAllStudents } from '../Controller/Student/GetAllStudents.js'
import { GetDummyStudents } from '../Controller/Test/GetStudents.js'
import { AddAVisitDate } from '../Controller/Student/AddVisitDate.js'
import { UpdateDocumentList } from '../Controller/Student/UpdateDocumentList.js'
import { UpdatePaymentList } from '../Controller/Student/UpdatePaymentChecklist.js'
const StudentRouter = Router()
// POST endpoint for user registration (without image upload)
StudentRouter.post('/NewStudent', createStudent)
StudentRouter.put('/UpdateStudent', updateStudentDetails)
StudentRouter.put('/UpdateVisitDate', AddAVisitDate)
StudentRouter.get('/GetNewStudents', GetNEWStudents)
StudentRouter.get('/GetSignedUpStudents', GetSignedUpStudents)
StudentRouter.get('/GetPotientialStudents', GetPotientialStudents)
StudentRouter.get('/GetNotInterested', GetNotInterestedStudents)
StudentRouter.get('/GetAllStudents', GetAllStudents)
StudentRouter.get('/GetDummy', GetDummyStudents)
StudentRouter.put('/UpdateDocumentList', UpdateDocumentList)
StudentRouter.put('/UpdatePaymentList', UpdatePaymentList)
export default StudentRouter
