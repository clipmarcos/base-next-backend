import type { NextApiRequest, NextApiResponse } from 'next'
import { DataUser } from '@/interfaces/User'
import { PrismaClient } from '@prisma/client'
import AuthServices from '@/backend/services/users.services'
const service = new AuthServices()

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
