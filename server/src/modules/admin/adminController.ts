import { NextFunction, Request, Response } from "express-serve-static-core";
import { createTrainerService,userByIdService,createMemberService,allUsersService,deletedUserService,createPlanService,getPlanService,assignPlanService,getStatusService,getAssignPlanService } from "../admin/adminService";
import { createTrainerSchema,createPlanSchema } from "./adminSchema";

//to create trainer 
export const createTrainer = async (req: Request, res: Response,next:NextFunction) => {
  //try catch block
 
  try {
    //data from the body
    
    const result=createTrainerSchema.safeParse(req.body)
    if(!result.success)
    {
       return res.status(400).json({error:result.error.issues })
    }
    const { name, email, password } = result.data;
    const adminId = req?.user?.id;
    if (!adminId) {
      return res.status(401).json({ message: "only admin can create trainer  " });
    }
    //validating
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields are empty" });
    }
    
    //check if the email alrady exist or not
       
    const trainer =await createTrainerService(name, email, password, adminId);
    return res.status(200).json({ message: "Trainer created sucessfully",trainer });
  } catch (err:any) {
    next(err)
  }
};


//to create member 
export const createMember=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
     const result=createTrainerSchema.safeParse(req.body)
    if(!result.success)
    {
       return res.status(400).json({error:result.error.issues })
    }
    const {name,email,password}=result.data
    const adminId=req.user?.id

    if(!adminId)
    {
      return res.status(401).json("Only admin can create member ")
    }
    if(!name||!email||!password)
    {
      return res.status(400).json({message:"The fields are empty "})
    }
    
    const member=await createMemberService(name,email,password,adminId)
    return res.status(200).json({message:"Member created sucessfully",member})
  }
  catch(err:any)
  {
    next(err)
  }
}
//get all the trainer 
export const getAllUsers=async(req:Request,res:Response,next:NextFunction)=>
{
  //try catch 
  try{
   
    const role=req.query.role as string
    const adminId=req.user?.id
    
   
    if(!role)
    {
      return res.status(400).json("only admin can get ")
    }
    if(!adminId)
    {
      return res.status(401).json("doesnt have adminid")
    }
    const allUsers=await allUsersService(role,adminId)
    return res.status(200).json(allUsers)
  }
  catch(err:any)
  {
    next(err)
  }

}

export const getUserById=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const userId=req.params.id as string
    const adminId=req.user?.id as string
    if(!userId)
    {
      return res.status(400).json({message:"couldnot get the userid from req"})
    }
    if(!adminId)
    {
      return res.status(401).json("Only admin can create member ")
    }
    const userById=await userByIdService(userId,adminId)
    return res.status(200).json(userById)
  }
  catch(err:any)
  {
    next(err)
  }
}

//delete user  by id
export const deleteUserById=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    //need the id of the deleting data
    const userId=req.params.id as string
    const adminId=req.user?.id
    if(!userId)
    {
      return res.status(400).json({message:"Doesnt have to id "})
    }
    if(!adminId)
    {
      return res.status(400).json({message:"only admin can delete "})
    }
    const deleteUser=await deletedUserService(adminId,userId)
    return res.status(200).json({message:"Successfully deleted the trainer"})

  }
  catch(err:any)
  {
    next(err)
  }
}

//create subscription plan
  export const createSubPlan=async(req:Request,res:Response,next:NextFunction)=>
  {
    try{
      const result=createPlanSchema.safeParse(req.body)
    if(!result.success)
    {
       return res.status(400).json({error:result.error.issues })
    }
      const {name,price,durationDays}=result.data
      const adminId=req.user?.id
      //check validation
      if(!name||!price||!durationDays)
      {
        return res.status(400).json({message:"The fields are empty "})
      }
      if(!adminId)
     {
      return res.status(401).json({message:"No adminId"})
     }
     const createPlan=await createPlanService(name,price,durationDays,adminId)
     return res.status(201).json({message:"SubscriptionPlan created Sucessfully",createPlan},)
  }
  catch(err:any)
  {
    next(err)
  }
}
//for getting the plans 
export const getAllPlan=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const adminId=req.user?.id as string
    if(!adminId)
    {
      return res.status(400).json({message:"no adminid"})
    }
    const getPlans=await getPlanService(adminId)
    return res.status(200).json(getPlans)
  }
  catch(err:any)
  {
    next(err)
  }
}

//for assigning plan to the user
export const assignPlan=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const {memberId,planId}=req.body 
    if(!memberId||!planId)
    {
      return res.status(400).json({message:"Request didnt have id  "})
    }
    const subscription=await assignPlanService(memberId,planId)
    
    return res.status(200).json({message:"Sucessfully assign the plan",subscription})

  }
  catch(err:any)
  {
    next(err)
  }
}
//get assign plan for the specific user 
export const getAssignPlan=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const memberId=req.params.id as string
    if(!memberId)
    {
      return res.status(401).json({message:"didnt get the memberid "})
    }
    const assignedPlan=await getAssignPlanService(memberId)
    return res.status(200).json(assignedPlan)
  }
  catch(err:any)
  {
    next(err)
  }
}
//memmber getting the subscribtion status 
export const getSubStatus=async(req:Request,res:Response,next:NextFunction)=>
{
  try{
    const memberId=req.user?.id 

    if(!memberId){
      return res.status(401).json({message:"Doesnt have the memberId in the req"})
    }
    const getStatus=await getStatusService(memberId)
    return res.status(200).json(getStatus)
  }
  catch(err:any)
  {
    next(err)
  }
}