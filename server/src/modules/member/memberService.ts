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

//book the trainer session 
export const sessionBookService =async(trainerId:string,date:Date,memberId:string)=>{
    // create the session booking 
    const createSession=await prisma.sessionBooking.create({
        data:{
            trainerId:trainerId,
            date:date,
            status:"BOOKED",
            memberId:memberId
        }
    })
    const removeSlot=await prisma.trainerAvailability.deleteMany
    ({
        where:{
            trainerId,
            date
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

