import { login } from '../../services/auth/login'

export const signIn = (props: any, path: string) => login(props, path)