import { Router } from 'express'
import { createStudent } from '../Controller/Student/CreateAStudent.js'
import { GetNEWStudents } from '../Controller/Student/GetNewStudents.js'
import { GetSignedUpStudents } from '../Controller/Student/GetSignedStudents.js'
import { GetPotientialStudents } from '../Controller/Student/GetPotentialStudents.js'
import { GetNotInterestedStudents } from '../Controller/Student/GetNotInterested.js'
import { GetAllStudents } from '../Controller/Student/GetAllStudents.js'
import { GetDummyStudents } from '../Controller/Test/GetStudents.js'
import { AddAVisitDate } from '../Controller/Student/AddVisitDate.js'
import { UpdateDocumentList } from '../Controller/Student/UpdateDocumentList.js'
import { UpdatePaymentList } from '../Controller/Student/UpdatePaymentChecklist.js'
import { GetPaymentDetails } from '../Controller/Student/GetPaymentDetails.js'
import { GetDocumentDetails } from '../Controller/Student/GetDocumentDetails.js'
import { UpdateStudentDetails } from '../Controller/Student/UpdateStudentDetails.js'
const StudentRouter = Router()
// POST endpoint for user registration (without image upload)
StudentRouter.post('/NewStudent', createStudent)
StudentRouter.put('/UpdateStudent', UpdateStudentDetails)
StudentRouter.put('/UpdateVisitDate', AddAVisitDate)
StudentRouter.get('/GetNewStudents', GetNEWStudents)
StudentRouter.get('/GetSignedUpStudents', GetSignedUpStudents)
StudentRouter.get('/GetPotientialStudents', GetPotientialStudents)
StudentRouter.get('/GetNotInterested', GetNotInterestedStudents)
StudentRouter.get('/GetAllStudents', GetAllStudents)
StudentRouter.get('/GetDummy', GetDummyStudents)
StudentRouter.put('/UpdateDocumentList', UpdateDocumentList)
StudentRouter.put('/UpdatePaymentList', UpdatePaymentList)
StudentRouter.get('/GetStudentPaymentCheckList', GetPaymentDetails)
StudentRouter.get('/GetDocumentCheckList', GetDocumentDetails)
export default StudentRouter
