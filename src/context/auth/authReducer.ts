import { IUser } from '@/interfaces'
import { AuthState } from './'

type AuthActionType =
  | { type: '[Auth] - Login'; payload: IUser }
  | { type: '[Auth] - Logout' }

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }
    default:
      return state
  }
}

//Que es Reducer:
// - Es una funcion comun y corriente
// - debe ser una funcion pura
// - debe de rerornar un nuevo estado
// - recibe 2 argumentos que son el valor inicial y la accion a ejecutar
