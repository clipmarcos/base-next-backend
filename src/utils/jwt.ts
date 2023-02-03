import jwt from 'jsonwebtoken'

export const singToken = (id: number) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No key JWT secret')
  }
  return jwt.sign(
    //payload
    { id },
    //secret
    process.env.JWT_SECRET_SEED,
    //Option
    { expiresIn: '30d' }
  )
}
