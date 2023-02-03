import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { jwt } from '@/utils'
import { DataUser } from '@/interfaces/User'
const prisma = new PrismaClient()

class AuthServices {
  async signIn(req: NextApiRequest, res: NextApiResponse<DataUser>) {
    const { email = '', password = '' } = req.body

    await prisma.$connect()

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    await prisma.$disconnect()

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Email or Password incorrect - EMAIL' })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ message: 'Email or Password incorrect - PASSWORD' })
    }

    const { role, name, id } = user

    const token = jwt.singToken(id)

    return res.status(200).json({
      token: token,
      user: {
        email,
        name,
        role,
      },
    })
  }
}
export default AuthServices
