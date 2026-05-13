import prisma from "../../lib/prisma"
export const viewAllPlansService = async (memberId: string) => {
  const getSubscription = await prisma.subscription.findFirst({
    where: {
      userId: memberId,
      status: "ACTIVE"
    },
    include: {
      plan: true
    }
  })
  return getSubscription
}

export const getTrainerAvailabilityService=async(trainerId:string)=>
{
    const trainerAvailable=await prisma.trainerAvailability.findMany({
        where:{
            trainerId:trainerId
        }
    })
    return trainerAvailable
}
//get all the trainers
export const getAllTrainersService=async(memberId:string)=>
{
    const member=await prisma.user.findUnique({
        where:{
            id:memberId
        },
        select:{adminId:true}
    })
     if (!member?.adminId) throw new Error("Member has no admin assigned")
    const getTrainers=await prisma.user.findMany({
        where:{
            adminId:member?.adminId,
            role:"TRAINER"
        }
        ,select:{
            id:true,
            name:true,
            email:true,
            role:true,
            availabilities:true
        }
    })  
    return getTrainers

}

//book the trainer session 
export const sessionBookService = async (trainerId: string, date: string, memberId: string) => {
  const activeSession = await prisma.sessionBooking.findFirst({
    where: {
      memberId,
      status: "BOOKED"
    }
  })

  if (activeSession) {
    throw new Error("You already have an active session. Complete or cancel it first.")
  }

  const createSession = await prisma.sessionBooking.create({
    data: {
      trainerId,
      date: new Date(date),
      status: "BOOKED",
      memberId
    }
  })

  await prisma.trainerAvailability.deleteMany({
    where: {
      trainerId,
      date: new Date(date)
    }
  })

  return createSession
}
//get all the sessionBooked
export const getAllSessionService=async(memberId:string)=>
{
    const getSession = await prisma.sessionBooking.findMany({
  where: { memberId },
  include: { trainer: true }
})
    return getSession
}
//add attendence 
export const addAttendenceService=async(memberId:string)=>
{
    const attendence=await prisma.attendance.create({
        data:{
            userId:memberId
        }
    })
    return attendence
}

//get attendence
export const getAttendenceService=async(memberId:string)=>
{
    const attendance=await prisma.attendance.findMany({
        where:{
            userId:memberId
        }
    })
    return attendance
}

