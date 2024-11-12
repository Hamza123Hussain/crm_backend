import { Router } from 'express'
import { SignUpController } from '../../Controllers/Auth/SignUp.js'
import { LoginController } from '../../Controllers/Auth/Login.js'
import { SignOutController } from '../../Controllers/Auth/SignOut.js'
import { upload } from '../../../MulterConfig.js'
import ResetPass from '../../Controllers/Auth/ResetPass.js'
const AuthRouter = Router()

AuthRouter.post('/Register', upload.single('image'), SignUpController)
AuthRouter.post('/Login', LoginController)
AuthRouter.get('/Signout', SignOutController)
AuthRouter.post('/Reset', ResetPass)

export default AuthRouter
