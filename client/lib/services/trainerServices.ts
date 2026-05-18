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
//post the workout plan 
export const createWorkoutPlans=async(data:{
    title:string,
    description:string
})=>
{
    const res=await api.post('/trainer/create-workoutPlans',data)
    return res.data
}
//get the trainerMember 
export const getTrainerMembers=async()=>
{
    const res=await api.get('/trainer/getMembers')
    console.log(res.data)
    return res.data
}
export const assignWorkoutPlan = async (data: { memberId: string, planId: string }) => {
  const res = await api.post('/trainer/assignWorkoutMember', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}

export const getWorkoutProgress = async () => {
  const res = await api.get('/trainer/getWorkoutProgress')  
  return res.data
}
export const getSession=async()=>
{
    const res=await api.get('/trainer/getSessions')
    return res.data
}
//add avaibility  
export const addAvailability = async (data: { date: string }) => {
  const res = await api.post('/trainer/availability', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}
//update session status     
export const updateSessionStatus = async (sessionId: string, status: string) => {
  const res = await api.patch(`/trainer/updateStatus/${sessionId}`, { status }, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}