import { id } from "zod/locales";
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
//delete user
export const deleteUser=async(id:string)=>
{
  const res=await api.delete(`/admin/deleteUser/${id}`)
  return res
}
//getallplans
export const getAllPlans=async()=>
{
    const res=await api.get('/admin/allPlans')
  
    return res.data
}
export const createSubPlan=async(data:{
  name:string
  price:number
  durationDays:number
})=>
{
  const res=await api.post('/admin/create-subscriptionPlan',data)
  return res.data
}
//delete plans
export const deletePlan=async()=>
{
  const res=await api.delete('/admin/')
}
//assign plan 
export const assignPlan=async(data:{
  memberId:string,
  planId:string
})=>
{
  const res=await api.post('/admin/assignPlan',data)
  return res.data
}


//get the assigned planed for the user
export const  getAssignPlan=async(memberId:string)=>
{
  const res=await api.get(`/admin/getAssignPlan/${memberId}`)
  return res.data
}
