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
import { GetSingleStudent } from '../Controller/Student/GetSingleStudent.js'
import { GetStudentStatusandTag } from '../Controller/Student/GetStatus.js'
import { UpdatestudentStatusandTag } from '../Controller/Student/UpdateStatusandTag.js'
import { GetAStudent } from '../Controller/Student/GetAStudent.js'
import { GetMeeting } from '../Controller/Student/Meeting/GetAMeeting.js'
import { GetAllMeetings } from '../Controller/Student/Meeting/GetAllMeetings.js'
import { UpdateMeeting } from '../Controller/Student/Meeting/UpdateMeeting.js'
import { DeleteMeeting } from '../Controller/Student/Meeting/DeleteMeeting.js'
import { AddMeeting } from '../Controller/Student/Meeting/AddAMeeting.js'
import { UpdateOptionDetails } from '../Controller/Student/Options/UpdateOption.js'
import { GetOptionDetails } from '../Controller/Student/Options/GetAllOptions.js'
import { GetSingleOptionDetail } from '../Controller/Student/Options/GetOption.js'
import { AddOptionDetails } from '../Controller/Student/Options/AddOption.js'
import { DeleteOptionDetails } from '../Controller/Student/Options/DeleteOption.js'
import { UpdateVisaDetails } from '../Controller/Student/Visa/UpdateVisa.js'
import { GetVisaDetails } from '../Controller/Student/Visa/GetVisaDetails.js'
import { DeleteVisaDetails } from '../Controller/Student/Visa/DeleteDetails.js'
import { AddandUpdateTravelDetails } from '../Controller/Student/Travel/AddTravelDetails.js'
import { GetTravelDetails } from '../Controller/Student/Travel/GetTravelDetails.js'
import { DeleteTravelDetails } from '../Controller/Student/Travel/DeleteTravelDetails.js'
import { OnlyCallReminders } from '../Controller/Student/Reminders/CallReminders.js'
import { MeetingReminders } from '../Controller/Student/Reminders/MeetingReminder.js'
import { AddContactDetails } from '../Controller/Student/Contact/AddContact.js'
import { GetContactDetails } from '../Controller/Student/Contact/GetAllContactDetailsOfStudent.js'
import { AddVisit } from '../Controller/Student/Visit/AddVisit.js'
import { UpdateVisit } from '../Controller/Student/Visit/UpdateVisit.js'
import { GetAllVisits } from '../Controller/Student/Visit/GetAllVisits.js'
import { DeleteVisit } from '../Controller/Student/Visit/DeleteVisit.js'
import { VisitReminders } from '../Controller/Student/Reminders/VisitReminders.js'
import { GetStudyAbroad } from '../Controller/Student/Education/GetStudyAbroadDetails.js'
import { GetAcademicLevels } from '../Controller/Student/Education/GetAcademicLevels.js'
import { GetuniversityDetails } from '../Controller/Student/Education/GetUniDetails.js'
import { GetTestDetails } from '../Controller/Student/Education/GetTestDetails.js'
import { UpdateUniversityDetails } from '../Controller/Student/Education/UpdateUniversity.js'
import { UpdateStudyAbroad } from '../Controller/Student/Education/UpdateStudyAbroad.js'
import { UpdateAcademicLevels } from '../Controller/Student/Education/UpdateAcademic.js'
import { UpdateTestDetails } from '../Controller/Student/Education/UpdateTest.js'
import { UpdateStudentProgress } from '../Controller/Student/Progress/UpdateProgress.js'
import { UpdateContactDetails } from '../Controller/Student/Contact/UpdateContact.js'
import { UpdateNotes } from '../Controller/Student/UpdateNotes.js'
import { getStudentsContactedTwoDaysAgo } from '../Controller/Student/Reminders/AllStudentsLastContacted.js'
import { UpdateLastMeeting } from '../Controller/Student/Meeting/UpdateLastMeeting.js'
import { GetPaymentStudents } from '../Controller/Student/GetPaymentStudents.js'
import { AddContactReminder } from '../Controller/Student/Contact/AddReminder.js'
import { UpdateContactReminder } from '../Controller/Student/Contact/UpdateReminder.js'
import { GetNoCallsstudents } from '../Controller/Student/GetNoCalls&NotesStudent.js'
import { createNotificationsForRecentStudents } from '../../recentstudents.js'
import { DeleteMeetingReminder } from '../Controller/Student/Reminders/DeleteMeetingReminder.js'
import { DeleteContactReminder } from '../Controller/Student/Reminders/DeleteContactReminder.js'
const StudentRouter = Router()
// POST endpoint for user registration (without image upload)
StudentRouter.post('/NewStudent', createStudent)
StudentRouter.put('/UpdateStudent', UpdateStudentDetails)
StudentRouter.put('/UpdateVisitDate', AddAVisitDate)
StudentRouter.get('/GetNewStudents', GetNEWStudents)
StudentRouter.get('/GetSignedUpStudents', GetSignedUpStudents)
StudentRouter.get('/GetPotientialStudents', GetPotientialStudents)
StudentRouter.get('/GetNotInterested', GetNotInterestedStudents)
StudentRouter.get('/GetSingleStudent', GetSingleStudent)
StudentRouter.get('/GetAllStudents', GetAllStudents)
StudentRouter.get('/GetDummy', GetDummyStudents)
StudentRouter.put('/UpdateDocumentList', UpdateDocumentList)
StudentRouter.put('/UpdatePaymentList', UpdatePaymentList)
StudentRouter.get('/GetStudentPaymentCheckList', GetPaymentDetails)
StudentRouter.get('/GetDocumentCheckList', GetDocumentDetails)
StudentRouter.put('/UpdateOptions', UpdateOptionDetails)
StudentRouter.get('/GetStudentOptions', GetOptionDetails)
StudentRouter.get('/GetAOption', GetSingleOptionDetail)
StudentRouter.post('/AddStudentOption', AddOptionDetails)
StudentRouter.delete('/DeleteAOption', DeleteOptionDetails)
StudentRouter.put('/UpdateStatusandTag', UpdatestudentStatusandTag)
StudentRouter.get('/GetStudentStatusandTag', GetStudentStatusandTag)
StudentRouter.get('/GetAStudent', GetAStudent)
StudentRouter.get('/GetASingleMeeting', GetMeeting)
StudentRouter.get('/GetAllMeeting', GetAllMeetings)
StudentRouter.put('/UpdateMeeting', UpdateMeeting)
StudentRouter.delete('/DeleteMeeting', DeleteMeeting)
StudentRouter.post('/AddMeeting', AddMeeting)
StudentRouter.post('/Add_Update_Visa', UpdateVisaDetails)
StudentRouter.get('/GetVisaDetails', GetVisaDetails)
StudentRouter.delete('/DeleteVisaDetails', DeleteVisaDetails)
StudentRouter.post('/Add_Update_Travel', AddandUpdateTravelDetails)
StudentRouter.get('/GetTravelDetails', GetTravelDetails)
StudentRouter.delete('/DeleteTravelDetails', DeleteTravelDetails)
StudentRouter.get('/GetCallReminders', OnlyCallReminders)
StudentRouter.get('/GetMeetingReminders', MeetingReminders)
StudentRouter.get('/GetASingleContact', GetMeeting)
StudentRouter.post('/AddAContact', AddContactDetails)
StudentRouter.get('/GetAllContact', GetContactDetails)
StudentRouter.put('/UpdateContact', UpdateMeeting)
StudentRouter.delete('/DeleteContact', DeleteMeeting)
StudentRouter.post('/AddANewVisit', AddVisit)
StudentRouter.put('/UpdateVisit', UpdateVisit)
StudentRouter.get('/GetAllVisits', GetAllVisits)
StudentRouter.delete('/DeleteAVisit', DeleteVisit)
StudentRouter.get('/GetVisitReminders', VisitReminders)
StudentRouter.get('/GetStudyAbroadDetails', GetStudyAbroad)
StudentRouter.get('/GetAcademicLevels', GetAcademicLevels)
StudentRouter.get('/GetUniversityDetails', GetuniversityDetails)
StudentRouter.get('/GetTestDetails', GetTestDetails)
StudentRouter.put('/UpdateUniversityDetails', UpdateUniversityDetails)
StudentRouter.put('/UpdateStudyAbroad', UpdateStudyAbroad)
StudentRouter.put('/updateAcademicLevels', UpdateAcademicLevels)
StudentRouter.put('/UpdateTestDetails', UpdateTestDetails)
StudentRouter.put('/UpdateStudentProgress', UpdateStudentProgress)
StudentRouter.put('/UpdateContactDetails', UpdateContactDetails)
StudentRouter.put('/UpdateStudentNotes', UpdateNotes)
StudentRouter.put('/UpdateLastMeeting', UpdateLastMeeting)
StudentRouter.get('/GetNoCallsstudents', GetNoCallsstudents)
StudentRouter.get('/LastContactedstudents', async (req, res) => {
  try {
    const students = await getStudentsContactedTwoDaysAgo()
    res.status(200).json({ success: true, data: students })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})
StudentRouter.post('/AddContactReminder', AddContactReminder)
StudentRouter.put('/UpdateContactReminder', UpdateContactReminder)
StudentRouter.get('/GetPaymentStudents', GetPaymentStudents)
StudentRouter.post('/RecentStudents', createNotificationsForRecentStudents)
StudentRouter.delete('/DeleteMeetingReminder', DeleteMeetingReminder)
StudentRouter.delete('/DeleteContactReminder', DeleteContactReminder)
export default StudentRouter
