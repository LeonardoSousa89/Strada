import { login } from "../../services/security/login";

export const signIn = (props: any, path: string, payload: any) =>
  login(props, path, payload);
