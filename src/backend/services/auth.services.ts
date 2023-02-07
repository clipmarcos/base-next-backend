import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { jwt } from '@/utils'
import { DataUser } from '@/interfaces/User'
const prisma = new PrismaClient()

class AuthServices {
  async signIn(req: NextApiRequest, res: NextApiResponse<DataUser>) {
    const { email = '', password = '' } = req.body

    try {
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
          id,
          email,
          name,
          role,
        },
      })
    } catch (error) {
      console.log(error)

      return res.status(500).json({
        message: 'Check Server Log',
      })
    } finally {
      await prisma.$disconnect()
    }
  }

  async checkJWT(req: NextApiRequest, res: NextApiResponse<DataUser>) {
    const { token = '' } = req.cookies

    let userId = 0
    try {
      userId = await jwt.isValidToken(token)
    } catch (error) {
      return res.status(401).json({
        message: 'Token de autorizacion no es valido',
      })
    }
    await prisma.$connect()

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    await prisma.$disconnect()

    if (!user) {
      return res
        .status(400)
        .json({ message: 'No Existe el usuario con ese id' })
    }
    const { role, name, id, email } = user
    const newToken = jwt.singToken(userId)

    return res.status(200).json({
      token: newToken,
      user: {
        id,
        email,
        name,
        role,
      },
    })
  }
}
export default AuthServices
