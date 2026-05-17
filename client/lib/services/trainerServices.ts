import api from "../api"

//get all the workout plans
export const getWorkoutPlans=async()=>
{
    const res= await api.get('/trainer/getWorkoutPlans')
    return res.data
    
}
//get the session status
export const getSessionStatus=async()=>
{
    const res=await api.get('/trainer/getSessions')
    return res.data
}
//get the traineravaibility 
export const getTrainerAvaibility=async()=>
{
    const res=await api.get('/trainer/getavailability')
    return res.data
}