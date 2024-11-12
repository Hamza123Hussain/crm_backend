import { Router } from 'express'
import { upload } from '../../MulterConfig.js'
import { RegisterUser } from '../Controller/Auth/SignUp.js'
import { Login } from '../Controller/Auth/SignIn.js'
import { Signout } from '../Controller/Auth/SignOut.js'
import { ResetPass } from '../Controller/Auth/ResetPass.js'
import { GetUser } from '../Controller/Auth/GetUser.js'
import { UpdateUser } from '../Controller/Auth/UpdateUser.js'
import { AllUsers } from '../Controller/Auth/AllUsers.js'
import { DeleteUser } from '../Controller/Auth/DeleteUser.js'
import { GetSalaryUser } from '../Controller/Auth/GetUserSalary.js'

const AuthRouter = Router()

AuthRouter.post('/Signup', upload.single('Image'), RegisterUser)
AuthRouter.post('/SignIn', Login)
AuthRouter.get('/Signout', Signout)
AuthRouter.post('/Reset', ResetPass)
AuthRouter.get('/GetUser', GetUser)
AuthRouter.get('/GetUserSalary', GetSalaryUser)
AuthRouter.get('/AllUsers', AllUsers)
AuthRouter.post('/UpdateUser', upload.single('Image'), UpdateUser)
AuthRouter.delete('/DeleteUser', DeleteUser)
export default AuthRouter
