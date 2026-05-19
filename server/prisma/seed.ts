import bcrypt from 'bcrypt'
import prisma from '../src/lib/prisma'
import {Role} from '@prisma/client'

async function main() {
    const existing =await prisma.user.findFirst({
        where:{
            role:Role.SUPER_ADMIN
        }
    })
    if(existing)
    {
       
        return
    }
    const hashedPassword=await bcrypt.hash('superadmin123',10)

    await prisma.user.create({
        data:{
            name:'Super Admin',
            email:'superadmin@123.com',
            password:hashedPassword,
            role:Role.SUPER_ADMIN
        }
    })
    

}
main()
.catch(console.error)
.finally(async () => {
    await prisma.$disconnect()
  })
