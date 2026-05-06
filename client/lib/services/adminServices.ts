import api from "../api";
//getting users from backend 
export const getAllUser=async(role:string)=>
{
    const res=await api.get(`/admin/users?role=${role}`)
    return res.data
}
//get user by id 
export const getUserById=async(id:string)=>
{
    const res=await api.get(`/admin/getuser/${id}`)
    return res.data
}
//delete user by id 
export const deleteUserById=async(id:string)=>
{
    const res=await api.delete(`/admin/deleteUser/${id}`)
    return res.data
}
//getallplans
export const getAllPlans=async()=>
{
    const res=await api.get('/admin/allPlans')
    return res.data
}
//create trainer
export const createTrainer = async (data: {
  name: string
  email: string
  password: string
}) => {
  const res = await api.post('/admin/create-trainer', data)
  return res.data
}

export const createMember = async (data: {
  name: string
  email: string
  password: string
}) => {
  const res = await api.post('/admin/create-member', data)
  return res.data
}
