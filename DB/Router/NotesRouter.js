import { Router } from 'express'
import { CreateNotes } from '../Controller/Notes/CreateNotes.js'
import { GetNotes } from '../Controller/Notes/GetNotes.js'
import { GetNotesForUser } from '../Controller/Notes/GetNotesByEmail.js'
import { UpdateNote } from '../Controller/Notes/UpdateNotes.js'
import { DeleteNote } from '../Controller/Notes/DeleteNotes.js'
const NotesRouter = Router()
NotesRouter.get('/CreateNotes', CreateNotes) // No image upload needed
NotesRouter.get('/GetAllNotes', GetNotes)
NotesRouter.get('/GetUserNotes', GetNotesForUser)
NotesRouter.get('/UpdateNotes', UpdateNote)
NotesRouter.get('/DeleteNotes', DeleteNote)
export default NotesRouter
