import express from 'express'
import authRoute from './modules/auth/authRoute'
import cors from 'cors'
import dotenv from 'dotenv'
import superAdminRoute from './modules/superAdmin/SuperAdminRoute'
import adminRoutes from './modules/admin/adminRoute'
import trainerRoute from './modules/trainer/trainerRoute'
import memberRoute from './modules/member/memberRoute'
import {errorHandler} from './middleware/errorHandler'
// import { globalLimiter } from './middleware/rateLimiter'
import cookieParser from 'cookie-parser'
dotenv.config()
const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
// app.use(globalLimiter)

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

//api for the login
app.use('/auth',authRoute)
app.use('/superAdmin',superAdminRoute)
app.use('/admin',adminRoutes)
app.use('/trainer',trainerRoute)
app.use('/member',memberRoute)

//for error handling globally 
app.use(errorHandler)


app.listen(5000, () => {
  console.log('Server running on port 5000')
})


