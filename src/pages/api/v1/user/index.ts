import type { NextApiRequest, NextApiResponse } from 'next'
// import { IUser } from '@/interfaces/user'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface IUsers {
  id: number
  name?: string
  email: string
  password?: string
  role?: string
  createdAt?: string
  updateAt?: string
}

// type Data =
//   | { message: string }
//   |  IUsers[]

type Data = { message: string }

export default function main(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(res)

    default:
      return res.status(400).json({ message: 'Enpoint not found' })
  }
}

const getUsers = async (res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  } finally {
    await prisma.$disconnect()
  }
}
