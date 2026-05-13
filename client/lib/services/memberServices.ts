import api from "../api"
export const getMemberPlans=async()=>
{
    const res=await api.get('/member/view-plans')
    return res.data
}
export const getAllTrainers = async () => {

  const res = await api.get('/member/getTrainers')
  return res.data
}
export const sessionBook = async (data: { trainerId: string, date: string }) => {
  const res = await api.post('/member/sessionBook', data, {
    headers: { 'Content-Type': 'application/json' }
  })
  return res.data
}
export const getAllSessionBook=async()=>
{
    const res=await api.get('/member/getAllSession')
    return res.data
}
