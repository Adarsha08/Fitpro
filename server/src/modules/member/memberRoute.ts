import {Router} from "express"
import { authMiddleware } from "../../middleware/authmiddleware"
import { roleMiddleware } from "../../middleware/rolemiddleware"
import {viewAllPlans,getTrainerAvailability,getAllTrainers,sessionBook,getAllSession,getAttendence,addAttendence} from '../member/memberController'
const router=Router()
//view assign plans for the member
router.get('/view-plans',authMiddleware,roleMiddleware(["MEMBER"]),viewAllPlans)
//get the available trainer 
router.get('/getTrainerAvailability/:id',authMiddleware,roleMiddleware(["MEMBER"]),getTrainerAvailability)
//get all the trainers available 
router.get('/getTrainers', authMiddleware, roleMiddleware(["MEMBER"]), getAllTrainers)
//book the trainer session 
router.post('/sessionBook',authMiddleware,roleMiddleware(["MEMBER"]),sessionBook)
//get all the session booked 
router.get('/getAllSession',authMiddleware,roleMiddleware(["MEMBER"]),getAllSession)
//post for member attendence 
router.post('/attendence',authMiddleware,roleMiddleware(["MEMBER"]),addAttendence)
//get all the attendence
router.post('/getAttendence',authMiddleware,roleMiddleware(["MEMBER"]),getAttendence)


export default router
