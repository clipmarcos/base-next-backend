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

export const isValidToken = (token: string): Promise<number> => {
  //autenticacion de seguridad por si alguien intenta usar mi autenticacion y se le olvido de usar
  //la configuracion
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('No key JWT secret')
  }

  //Promise() me permite a que sea una promesa siempre
  return new Promise((resolve, reject) => {
    try {
      //tenemos un collbase
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT Is Invalid')

        const { id } = payload as { id: number }

        resolve(id)
      })
    } catch (error) {
      reject('JWT Is Invalid, Catch')
    }
  })
}
