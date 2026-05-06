import { Router } from "express";
import {login,refreshToken} from './authController'
// import { authLimiter } from "../../middleware/rateLimiter";

const router =Router()
router.post('/login',login)
router.post('/refreshToken',refreshToken)
export default router 