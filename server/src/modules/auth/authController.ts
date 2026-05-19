import { Request,NextFunction, Response } from 'express'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { loginService,refreshService } from './authService'
import { loginSchema } from './authSchema'

//controller for login 
export const login = async (req: Request, res: Response,next: NextFunction) => {
  try {
    const result =loginSchema.safeParse(req.body)
    if(!result.success)
    {
      return res.status(400).json({error:result.error.issues })
    }
    const { email, password } =result.data    
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(403).json({ message: 'Email does not exist' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Wrong credentials' })

    const { accessToken, refreshToken } = loginService(user.id, user.role)

   res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',  // ← change this
  maxAge: 24 * 60 * 60 * 1000
})

    return res.status(200).json({ message: 'Login successful', accessToken,user:{
      id:user.id,
      role:user.role,
      name:user.name
    } })
  } catch (err) {
    next(err)
  }
}

//controller for the refreshToken 
export const refreshToken =async (req: Request, res: Response,next:NextFunction) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    if (!process.env.JWT_REFRESH_TOKEN || !process.env.JWT_ACCESS_TOKEN) {
      return res
        .status(500)
        .json({ message: "JWT secrets not configured" });
    }
    const {accessToken,user}=await refreshService(token)

    return res.status(200).json({ accessToken,user });
  } catch (err) {
    next(err)
  }
};