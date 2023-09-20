import { changeScreen } from "../../../../controllers/navigate/navigate";

export const list = [
  {
    id: "1",
    name: "conta",
    path: "user-account",
    imageUri: ""
  },
  {
    id: "2",
    name: "suporte",
    path: "vex-support",
    imageUri: ""
  },
];

export const navigation = (props: any, path: any) => changeScreen(props, path)
