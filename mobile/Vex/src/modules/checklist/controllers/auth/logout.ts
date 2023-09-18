import { logOut } from "../../services/auth/logout";

export const signOut = (props: any, path: string) => logOut(props, path);
