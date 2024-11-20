import { Router } from 'express'
import { RegisterUser } from '../Controller/Auth/SignUp.js'
import { Login } from '../Controller/Auth/SignIn.js'
import { Signout } from '../Controller/Auth/SignOut.js'
import { ResetPass } from '../Controller/Auth/ResetPass.js'
import { GetUser } from '../Controller/Auth/GetUser.js'
import { UpdateUser } from '../Controller/Auth/UpdateUser.js'
import { AllUsers } from '../Controller/Auth/AllUsers.js'
import { DeleteUser } from '../Controller/Auth/DeleteUser.js'
const AuthRouter = Router()
// POST endpoint for user registration (without image upload)
AuthRouter.post('/Signup', RegisterUser) // No image upload needed
AuthRouter.post('/SignIn', Login)
AuthRouter.get('/Signout', Signout)
AuthRouter.post('/Reset', ResetPass)
AuthRouter.get('/GetUser', GetUser)
AuthRouter.get('/AllUsers', AllUsers)
AuthRouter.post('/UpdateUser', UpdateUser) // Assuming UpdateUser doesn't require image anymore
AuthRouter.delete('/DeleteUser', DeleteUser)
export default AuthRouter
