import express from "express"
// controller imports
import { signUp, signIn, fetchAnUser ,Logout} from "../controllers/userController.js"
import  verifyToken  from "../middleware/verifyToken.js"
const router = express.Router()
 
// routers
router.post('/register', signUp)
router.post('/login', signIn)
router.post('/logout',Logout)
router.get('/fetchuser',verifyToken, fetchAnUser)

export default router;