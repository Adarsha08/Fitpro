import api from "../api"

//get all the workout plans
export const getWorkoutPlans=async()=>
{
    const res= await api.get('/trainer/getWorkoutPlans')
    return res.data
    
}