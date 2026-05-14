import { NextFunction, Request, Response } from "express";

import {
  createWorkoutService,
  getAllPlanService,
  assignWorkoutService,
  addAvailabilityService,
  updateSessionService

} from "./trainerService";
//for creating the workout plan
export const createWorkout = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { title, description } = req.body;
    const trainerId = req.user?.id;
    if (!trainerId) {
      return res.status(400).json("Request doesnt have the trainerId");
    }
    if (!title || !description) {
      return res.status(401).json({ message: "The fields are empty " });
    }
    const createdWorkout = await createWorkoutService(
      title,
      description,
      trainerId,
    );
    return res
      .status(200)
      .json({ message: "Created the workout plan", createdWorkout });
  } catch (err: any) {
    next()
  }
};
//get all the workout plans
export const getAllPlan = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const trainerId = req.user?.id;
    if (!trainerId) {
      return res
        .status(200)
        .json({ message: "Request doesnt have the trainerId" });
    }
    const getAllPlan = await getAllPlanService(trainerId);
    return res.status(200).json(getAllPlan);
  } catch (err: any) {
    next(err)
  }
};
//assigning the workout plan to member
export const assignWorkout = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const trainerId=req.user?.id

    const { memberId, planId } = req.body;
    if(!trainerId)
    {
      return res.status(401).json({message:"didint get the trainerid from req"})
    }
    if (!memberId || !planId) {
      return res.status(400).json({ message: "Didnt got the memberId and planid in req" });
    }
    const assignedWorkout = await assignWorkoutService(memberId, planId,trainerId);
    return res.status(201).json({ message: "Assigned Workout", assignedWorkout });
  } catch (err: any) {
    next(err)
  }
};
//updating the Availability of trainer 
export const addAvailability=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const trainerId=req.user?.id
    const { date } = req.body
    if(!trainerId||!date)
    {
      return res.status(400).json({message:"Didnt get the trainer id from req"})
    }
    const addedAvailability=await addAvailabilityService(trainerId,date)
    return res.status(200).json({message:"added availibility",addedAvailability})
  }
  catch(err:any)
  {
   next(err) 
  }
}
//update the status
export const updateStatus=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const status=req.body
    const sessionId=req.params.id as string
    if(!status)
    {
      return res.status(400).json({message:"the fields are empty "})
    }
    const updatedSession=await updateSessionService(status,sessionId)
    return res.status(201).json({message:"Updated sessionStatus ",updateSessionService})
  }
  catch(err:any)
  {
    next(err)
  }
}


