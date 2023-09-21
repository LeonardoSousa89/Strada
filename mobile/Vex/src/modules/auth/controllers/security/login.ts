import { login } from "../../services/security/login";

export const signIn = (props: any, path: string) => login(props, path)