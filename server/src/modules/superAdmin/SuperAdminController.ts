import {NextFunction, Request,Response} from 'express'
import {createAdminService,deleteAdminService,getAdminsService} from '../superAdmin/SuperAdminService'
import { createAdminSchema } from './superAdminSchema'
//creating the admin 
export const createAdmin = async (req: Request, res: Response ,next:NextFunction) => {
  try {
    const result=createAdminSchema.safeParse(req.body)
    if(!result.success)
    {
      return res.status(400).json({error:result.error.issues })
    }

    const { name, email, password } = result.data;
    if (!name || !email || !password) return res.status(400).json({ message: 'Fields are empty' })

    const admin = await createAdminService(name, email, password)
    return res.status(201).json({ message: 'Admin created successfully', user: { id: admin.id, name: admin.name, email: admin.email, role: admin.role } })
  } catch (err: any) {
    next(err)
  }
}

//for deleting the admin
export const deleteAdmin=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const adminId=req.params.id as string
    const superAdminId=req.user?.id
    if(!adminId)
    {
      return res.status(400).json({message:"Doesnt have the adminid in the request "})
    }
    if(!superAdminId)
    {
      return res.status(401).json({message:"Doesnt have the SuperAdmin id"})
    }
    const deletedAdmin=await deleteAdminService(adminId,superAdminId)
    return res.status(200).json({message:"Sucessfully deleted the admin"})
  }
  catch(err:any)
  {
   next(err)
  }
}
//get all the admins 
export const getAdmins=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const superAdmin=req.user?.id
    if(!superAdmin)
    {
      return res.status(400).json({message:"Unauthorized"})
    }
    const getAllAdmins=await getAdminsService()
   
    return res.status(200).json(getAllAdmins)
  }
  catch(err:any)
  {
    next(err)
  }
}