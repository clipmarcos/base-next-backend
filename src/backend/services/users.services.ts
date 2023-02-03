import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { jwt } from '@/utils'
import { DataUser } from '@/interfaces/User'
const prisma = new PrismaClient()

class UserServices {
  // create a user
  async create(req: NextApiRequest, res: NextApiResponse<DataUser>) {
    const { email = '', password = '', name = '' } = req.body
    // Todo: validate the email valido

    // verify that the email exists
    await prisma.$connect()
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (user) {
      await prisma.$disconnect()
      return res
        .status(400)
        .json({ message: `The email: ${email} already exists` })
    }

    // validate the password max 6 characters
    if (password.length < 6) {
      return res.status(400).json({ message: `Password must be 6 characters` })
    }

    // encrypt password
    const salt = bcrypt.genSaltSync(10)
    const passw = bcrypt.hashSync(password, salt)

    try {
      // save user in database
      const newUser = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: passw,
          role: 'GUEST',
        },
      })
      const { id, role: newRole, email: newEmail, name: newName } = newUser

      const token = jwt.singToken(id)

      return res.status(200).json({
        token: token,
        user: {
          email: newEmail,
          name: newName,
          role: newRole,
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

  // List all users
  // Find a single user
  // update a user
  // delete a user
  // verify that the email exists
  // verify that the rol exists
  // encrypt password
  // save user in database
}

export default UserServices
