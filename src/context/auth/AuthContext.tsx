import { IUser } from '@/interfaces'
import { createContext } from 'react'

//ContextProps: Son las propiedades para que los componentes hijos puedan observar
interface ContextProps {
  isLoggedIn: boolean
  user?: IUser

  //Methods
  loginUser: (email: string, password: string) => Promise<boolean>
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean
    message?: string
  }>
  onLogout?: () => void
}

export const AuthContext = createContext({} as ContextProps)
