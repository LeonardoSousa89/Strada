import { changeScreen } from "../../../../controllers/navigate/navigate";

export const list = [
  {
    id: "1",
    name: "atualizar dados cadastrais",
    path: "driver-update-data",
    imageUri: "",
  },
  {
    id: "2",
    name: "atualizar senha",
    path: "driver-password-update",
    imageUri: "",
  },
  {
    id: "3",
    name: "visualizar informações do motorista",
    path: "driver-info",
    imageUri: "",
  },
];

export const navigation = (props: any, path: any) => changeScreen(props, path);
