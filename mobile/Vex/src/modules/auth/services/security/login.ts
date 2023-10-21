import { driverAuth, orgAuth } from "../../../../interface/types/auth/auth";
import { navigate } from "../navigate/navigate";

export function login(props: any, path: string, payload: any) {
  const OrgAuth: orgAuth = {
    cnpj: payload.cnpj,
    password: payload.password,
  };

  navigate(props, path);
}
