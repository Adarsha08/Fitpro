import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
export const createAdminService=async(name:string,email:string,password:string)=>
{
     const checkEmail=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(checkEmail)
        {
             throw new Error('Email already exists')
        }
        //hasing the password 
        const hashedpassword=await bcrypt.hash(password,10)
        const Admin=await prisma.user.create({
            data:{  
                name:name,
                email:email,
                password:hashedpassword,
                role:'ADMIN'
            }
        })
        return Admin
}

export const deleteAdminService = async (adminId: string, superAdmin: string) => {
  const checkAdmin = await prisma.user.findUnique({
    where: { id: adminId }
  })

  if (!checkAdmin) {
    throw new Error("Admin doesnt exist")
  }

  const deleteAdmin = await prisma.user.delete({
    where: { id: adminId }
  })

  return deleteAdmin
}

//get all the admins 
export const getAdminsService=async()=>
{
    const getAdmins=await prisma.user.findMany({
        where:{role:"ADMIN"},
        select:{
        id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
        }
     })
     return getAdmins
}