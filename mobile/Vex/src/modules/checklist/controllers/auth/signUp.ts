import { signUp } from '../../services/auth/signUp'

export const register = (props: any, path: string) => signUp(props, path)