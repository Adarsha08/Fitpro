import api from "../api"

//get all the members plans 
export const getMemberPlans=async()=>
{
    const res=await api.get('/member/view-plans')
    return res.data
}
//get all trainers 
export const getAllTrainers = async () => {

  const res = await api.get('/member/getTrainers')
  return res.data
}
//book session
export const sessionBook = async (data: { trainerId: string, date: string }) => {
  const res = await api.post('/member/sessionBook', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}
//get all the sessions
export const getAllSessionBook=async()=>
{
    const res=await api.get('/member/getAllSession')
    return res.data
}
//get all the attencende list 
export const getAttendence=async()=>
{
  const res=await api.get('/member/getAttendence')
  return res.data
}
//post the attendence 
export const markAttendence=async()=>
{
  const res=await api.post('/member/attendence')
  return res.data
}

