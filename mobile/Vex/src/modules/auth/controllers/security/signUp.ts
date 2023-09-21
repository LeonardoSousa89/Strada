import { signUp } from "../../services/security/signUp";

export const register = (props: any, path: string) => signUp(props, path)