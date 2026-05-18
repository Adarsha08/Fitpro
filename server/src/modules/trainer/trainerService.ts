import { TransformStreamDefaultController } from "stream/web";
import prisma from "../../lib/prisma"
import { SessionStatus } from '@prisma/client'
import bcrypt from "bcrypt";
//creating the workout 
export const createWorkoutService=async(title:string,description:string,trainerId:string)=>
{    
    const createdWorkout=await prisma.workoutPlan.create({
        data:{
            title:title,
            description:description,
            trainerId:trainerId
        }
    })
    return createdWorkout
}

//gettting all the workout plan created by the trainer
export const getAllPlanService=async(trainerId:string)=>
{
    const getAllPlan=await prisma.workoutPlan.findMany({
        where:{
            trainerId:trainerId
        }
    })
    if(!getAllPlan)
    {
        throw new Error("Doesnt have any plans")

    }
    return getAllPlan
}
//assigning the workout plan to the members 
export const assignWorkoutService=async(memberId:string,planId:string,trainerId:string)=>
{
    
    const checkplans=await prisma.workoutPlan.findFirst({
        where:{
            trainerId:trainerId
        }
    })
    if(!checkplans)
    {
        throw new Error("Plan doesnt exist ")
    }
    const existing = await prisma.workoutAssignment.findFirst({
    where: { memberId, planId }
    })
    if (existing) {
    throw new Error("This plan is already assigned to this member")
    }
    const assignWorkout=await prisma.workoutAssignment.create({
        data:{
            memberId:memberId,
            planId:planId
        }
    })
    return assignWorkout
}
//creating the availability of the trainer 
export const addAvailabilityService=async(trainerId:string,date:Date)=>
{
    const addedAvailability = await prisma.trainerAvailability.create({
  data: {
    trainerId,
    date: new Date(date)
  }
})
    return addedAvailability
}

//update the sessionStatus 
export const updateSessionService = async ( status: string,sessionId: string) => {
  const updated = await prisma.sessionBooking.update({
    where: { id: sessionId },
    data: { 
        status:status as SessionStatus
     }
  })
  return updated
}
//get session 
export const getTrainerSessionsService=async(trainerId:string)=>
{
    const trainerSession=await prisma.sessionBooking.findMany({
        where:{
            trainerId:trainerId
        }
    })
    return trainerSession
}
//get the avaibility 
export const getTrainerAvailabilityService=async(trainerId:string)=>
{
    const avaibility=await prisma.trainerAvailability.findMany({
        where:{
            trainerId:trainerId
        }
    })
    return avaibility
}
//get all the members
export const getMembersService=async(trainerId:string)=>
{
    const trainer = await prisma.user.findUnique({
    where: { id: trainerId },
    select: { adminId: true }
  })

  if (!trainer?.adminId) throw new Error("Trainer has no admin assigned")

  const members = await prisma.user.findMany({
    where: {
      adminId: trainer.adminId,
      role: "MEMBER"
    },
    select: { id: true, name: true, email: true }
  })

  return members
}


export const getWorkoutProgressService = async (trainerId: string) => {
  const progress = await prisma.workoutAssignment.findMany({
    where: {
      plan: { trainerId }
    },
    include: {
      plan: true,
      member: { select: { id: true, name: true, email: true } }
    }
  })
  return progress
}