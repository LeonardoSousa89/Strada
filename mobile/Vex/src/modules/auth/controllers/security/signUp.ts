import { signUp } from "../../services/security/signUp";

export const register = (
  cnpj: string,
  password: string,
  props: any,
  path: string
) => signUp(cnpj, password, props, path);
