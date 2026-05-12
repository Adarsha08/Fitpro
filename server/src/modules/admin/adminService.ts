import { Role } from "@prisma/client";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

//for creating trainer
export const createTrainerService = async (
  name: string,
  email: string,
  password: string,
  adminId: string,
) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log("hello");

  //check if the email exist or not
  if (checkEmail) {
    throw new Error("Email already exists");
  }
  console.log("hello1");

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const createTrainer = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      role: "TRAINER",
      adminId: adminId,
    },
  });
  return createTrainer;
};

//for creating member
export const createMemberService = async (
  name: string,
  email: string,
  password: string,
  adminId: string,
) => {
  //check if the there is any existing member
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    throw new Error("Email already existed");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const member = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      adminId: adminId,
      role: "MEMBER",
    },
  });
  return member;
};

//for getting all trainer
export const allUsersService = async (role: string,adminId:string) => {
  
  const allUsers = await prisma.user.findMany({
    where: {
      adminId:adminId,
      role: role as Role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      adminId: true,
      createdAt: true,
    },
  });
  if (allUsers.length === 0) {
    throw new Error("No members found");
  }
  return allUsers;
};

//getting user by id
export const userByIdService = async (userId: string, adminId: string) => {
  //check if the user exist or not
  const checkUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      adminId: true,
      role: true,
    },
  });
  if (!checkUser) {
    throw new Error("User not found");
  }
  if (checkUser.adminId !== adminId) {
    throw new Error("You are not authorized to get this user ");
  }
  return checkUser;
};

//for deleting the user(trainer/member)
export const deletedUserService = async (adminId: string, userId: string) => {
  //first check if the trainer exist or not by
  const checkUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!checkUser) {
    throw new Error("User with this id  doesnt exist");
  }

  //check if the adminid of the trainer and the admin trying to delete is same or not
  if (checkUser.adminId !== adminId) {
    throw new Error("You are not authorized to delete this adminid");
  }
  console.log('checkUser.adminId:', checkUser.adminId)
console.log('adminId:', adminId)
  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });
  return deletedUser;
};

//for creating the plans
export const createPlanService = async (
  name: string,
  parsedPrice: number,
  parsedDays: number,
  adminId: string,
) => {
  const createPlan = await prisma.subscriptionPlan.create({
    data: {
      name: name,
      price: parsedPrice,
      durationDays: parsedDays,
      adminId: adminId,
    },
  });
  return createPlan;
};

//for getting all the plans
export const getPlanService = async (adminId: string) => {
  const getPlans = await prisma.subscriptionPlan.findMany({
    where: {
      adminId: adminId,
    },
  });
  return getPlans;
};

//assiging the plan logic
export const assignPlanService = async (memberId: string, planId: string) => {
  const checkAssignPlan = await prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });
  if (!checkAssignPlan) {
    throw new Error("There is no assign plan  ");
  }
  const existingSubscription = await prisma.subscription.findFirst({
    where: {
      userId: memberId,
      status: "ACTIVE",
    },
  });
  if (existingSubscription) {
    throw new Error("Member already has an active subscription");
  }
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + checkAssignPlan.durationDays);

  const subscription = await prisma.subscription.create({
    data: {
      userId: memberId,
      planId: planId,
      endDate: endDate,
    },
    select: {
      id: true,
      endDate: true,
      status: true,
    },
  });
  return subscription;
};

//get the assigned plan of the member 
export const getAssignPlanService=async(memberId:string)=>
{
  const assignedPlan=await prisma.subscription.findMany({
    where:{
      userId:memberId
    }
  })
  return assignedPlan
}

//gettting the member status 
export const getStatusService=async(memberId:string)=>
{
  const getStatus=await prisma.subscription.findFirst({
    where:{
      userId:memberId
    },
    select:{
      status:true,
      endDate:true
    }

  })
  if(!getStatus)
  {
    throw new Error("doesnt have the subscription ")
  }
  return getStatus
}
