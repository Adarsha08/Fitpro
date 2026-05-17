import { Router } from "express";
import { authMiddleware } from "../../middleware/authmiddleware";
import { roleMiddleware } from "../../middleware/rolemiddleware";
import {createWorkout,getAllPlan,assignWorkout,addAvailability,updateStatus,getTrainerSessions,getAvailability} from "../trainer/trainerController"

const router=Router();
router.post('/create-workoutPlans',authMiddleware,roleMiddleware(["TRAINER"]),createWorkout)
//get the workout plans made by the member 
router.get('/getWorkoutPlans',authMiddleware,roleMiddleware(["TRAINER"]),getAllPlan)
//assigning the workout plan by the trainer to member 
router.post('/assignWorkoutMember',authMiddleware,roleMiddleware(["TRAINER"]),assignWorkout)
//trainer set avaibility 
router.post('/availability',authMiddleware,roleMiddleware(["TRAINER"]),addAvailability)
//get trainer availabilty
router.get('/getavailability',authMiddleware,roleMiddleware(["TRAINER"]),getAvailability)
//trainer update the SessionStatus
router.patch('/updateStatus/:id',authMiddleware,roleMiddleware(["TRAINER"]),updateStatus)
//get session status 
router.get('/getSessions', authMiddleware, roleMiddleware(["TRAINER"]), getTrainerSessions)

export default router   