import { changeScreen } from "../../../../controllers/navigate/navigate";

export const list = [
    {
      id: "1",
      name: "cadastrar motorista",
      path: "driver-register",
      imageUri: ""
    },
    {
      id: "2",
      name: "editar motorista",
      path: "driver-edit",
      imageUri: ""
    },
];

export const navigation = (props: any, path: any) => changeScreen(props, path)
