import type { NextApiRequest, NextApiResponse } from 'next'
import { DataUser } from '@/interfaces/User'
import { PrismaClient } from '@prisma/client'
import AuthServices from '@/backend/services/users.services'
const service = new AuthServices()
const prisma = new PrismaClient()

// type Data = {
//   message: string
//   data?: IUser[]
// }

export default function main(
  req: NextApiRequest,
  res: NextApiResponse<DataUser>
) {
  switch (req.method) {
    case 'POST':
      return service.create(req, res)

    default:
      return res.status(400).json({ message: 'Enpoint not found' })
  }
}

// const getUsers = async (res: NextApiResponse) => {
//   try {
//     const users = await prisma.user.findMany({
//       orderBy: [
//         {
//           createdAt: 'desc',
//         },
//       ],
//     })
//     return res.status(200).json(users)
//   } catch (error) {
//     return res.status(500).json(error)
//   } finally {
//     await prisma.$disconnect()
//   }
// }
