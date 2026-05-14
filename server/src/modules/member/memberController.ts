import { NextFunction, Request,Response } from "express-serve-static-core"
import{viewAllPlansService,getTrainerAvailabilityService,sessionBookService,addAttendenceService,getAllSessionService,getAttendenceService,getAllTrainersService} from './memberService'
export const viewAllPlans=async(req:Request,res:Response,next:NextFunction)=>
{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"Didnt get the memberId in request "})
        }
        const getAllPlans=await viewAllPlansService(memberId)
        return res.status(201).json(getAllPlans)
    }   
    catch(err:any)
    {
        next(err)
    } 
}
//get trainer who are availabible 
export const getTrainerAvailability=async(req:Request,res:Response,next:NextFunction)=>
{
    try{
        
        const trainerId=req.params.id as string
        if(!trainerId)
        {
            return res.status(400).json({message:"Request doesnt have memberid"})
        }
        const trainerAvailable=getTrainerAvailabilityService(trainerId)
        return res.status(200).json(trainerAvailable)

    }
    catch(err:any)
    {
        next(err)
    }
}
//get all the trainers
export const getAllTrainers=async(req:Request,res:Response,next:NextFunction)=>
{
    

    try{
        const memberId=req.user?.id 
        if(!memberId)
        {
            return res.status(400).json({message:"no userid "})
        }
        const getTrainers=await getAllTrainersService(memberId)
        return res.status(200).json(getTrainers)
    }
    catch(err:any)
    {
         next(err)
    }
}
//book the session 
export const sessionBook=async(req:Request,res:Response,next:NextFunction)=>{
      console.log("body:", req.body)
  console.log("user:", req.user)
    try{
        const {trainerId,date}=req.body
        const memberId=req.user?.id as string
        if(!trainerId||!date){
            return res.status(400).json({message:"Request body is empty"})
        }
        if(!memberId)
        {
            return res.status(401).json({message:"didnt get the memberid in the req params "})
        }
        const bookedSession=await sessionBookService(trainerId,date,memberId)
        return res.status(200).json({message:"Created Sucessfully",bookedSession})
    }
    catch(err:any)
    {
      next(err)
    }
}
//get all the sessionBooked
export const getAllSession=async(req:Request,res:Response,next:NextFunction)=>
{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"request doesnt have the memberId"})
        }
        const getSession=await getAllSessionService(memberId)
        return res.status(200).json(getSession)
    }
    catch(err:any)
    {
        next(err)
    }
}
//add attendence 
export const addAttendence =async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const memberId=req.user?.id
        if(!memberId)
        {
            return res.status(400).json({message:"Unauthorized "})
        }
        const attendence=await addAttendenceService(memberId)
        return res.status(201).json({message:"Added attendence",attendence})
    }
    catch(err:any)
    {
        next(err)
    }
}
//get the attendence
export const getAttendence=async(req:Request,res:Response,next:NextFunction)=>
{
    try{
        const memberId=req.user?.id as string
        if(!memberId)
        {
            return res.status(400).json({message:"Unauthorized"})
        }
        const getAttendence=getAttendenceService(memberId)
        return res.status(200).json(getAttendence)
    }
    catch(err:any)
    {
        next(err)
    }
}