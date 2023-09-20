import { changeScreen } from "../../../../controllers/navigate/navigate";

export const list = [
  {
    id: "1",
    name: "atualizar dados cadastrais",
    path: "",
    imageUri: "",
  },
  {
    id: "2",
    name: "atualizar senha",
    path: "",
    imageUri: "",
  },
  {
    id: "3",
    name: "visualizar informações do motorista",
    path: "",
    imageUri: "",
  },
];

export const navigation = (props: any, path: any) => changeScreen(props, path);
