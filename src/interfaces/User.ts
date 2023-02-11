import bcrypt from 'bcryptjs'

export interface IUser {
  id: number
  email: string
  name?: string | null
  role: string
}

// export interface User {
//   id: number
//   email: string
//   name: string | null
//   role: string
// }

export type DataUser = {
  message?: string
  token?: string
  user?: IUser
}

//? fake data to populate user table
interface SeedIUser {
  name: string
  email: string
  password: string
  role: Role
  createdAt?: string
  updateAt?: string
}

type Role = 'ADMIN' | 'DEVELOPER' | 'GUEST'

interface SeeDataUser {
  users: SeedIUser[]
}

export const initialDataUser: SeeDataUser = {
  users: [
    {
      name: 'Marcos Ortiz',
      email: 'marcos@gmail.com',
      password: bcrypt.hashSync('admin123'),
      role: 'ADMIN',
    },
    {
      name: 'Maria Perez',
      email: 'guest@gmail.com',
      password: bcrypt.hashSync('guest123'),
      role: 'GUEST',
    },
    {
      name: 'Fulinito Ronaldo',
      email: 'developer@gmail.com',
      password: bcrypt.hashSync('developer123'),
      role: 'DEVELOPER',
    },
  ],
}
