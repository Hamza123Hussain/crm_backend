import { Router } from 'express'
import { CreateIntern } from '../Controller/Intern/CreateIntern.js'
import { UpdateIntern } from '../Controller/Intern/UpdateIntern.js'
import { DeleteIntern } from '../Controller/Intern/DeleteIntern.js'
import { GetInterns } from '../Controller/Intern/GetAllInterns.js'
import { GetIntern } from '../Controller/Intern/GetIntern.js'
const InternRouter = Router()
InternRouter.post('/CreateIntern', CreateIntern)
InternRouter.put('/UpdateIntern', UpdateIntern)
InternRouter.delete('/DeleteIntern', DeleteIntern)
InternRouter.get('/GetAllInterns', GetInterns)
InternRouter.get('/SingleIntern', GetIntern)
export default InternRouter
