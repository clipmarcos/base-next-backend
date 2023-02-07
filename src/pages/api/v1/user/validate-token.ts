import type { NextApiRequest, NextApiResponse } from 'next'
import AuthServices from '@/backend/services/auth.services'
import { DataUser } from '@/interfaces/User'
const service = new AuthServices()

export default function main(
  req: NextApiRequest,
  res: NextApiResponse<DataUser>
) {
  switch (req.method) {
    case 'GET':
      return service.checkJWT(req, res)

    default:
      res.status(400).json({ message: 'Bad request' })
  }
}
