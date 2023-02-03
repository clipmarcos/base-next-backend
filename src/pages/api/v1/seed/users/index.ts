import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { initialDataUser, IUser } from '@/interfaces/User'

const prisma = new PrismaClient()

type Data = {
  message: string
  users?: IUser[]
}

export default function main(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return setFakeDataUsers(res)
    default:
      return res.status(400).json({ message: 'Enpoint not found' })
  }
}

const setFakeDataUsers = async (res: NextApiResponse<Data>) => {
  try {
    await Promise.all(
      initialDataUser.users.map((n) =>
        prisma.user.create({
          data: {
            name: n.name,
            email: n.email,
            password: n.password,
            role: n.role,
            createdAt: n.createdAt,
            updateAt: n.updateAt,
          },
        })
      )
    )
      .then(() => console.info('[SEED] Succussfully create Users records'))
      .catch((e) => console.error('[SEED] Failed to create Users records', e))

    const users = await prisma.user.findMany()
    return res.status(200).json({
      message: 'Successfully created',
      users: users,
    })
  } catch (error) {
    return res.status(500).json({ message: 'error creating users' })
  } finally {
    await prisma.$disconnect()
  }
}
