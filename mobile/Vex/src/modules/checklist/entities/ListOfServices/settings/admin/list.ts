import { changeScreen } from "../../../../controllers/navigate/navigate";

export const list = [
    {
      id: "1",
      name: "dados da conta",
      path: "",
      imageUri: ""
    },
    {
      id: "2",
      name: "planos",
      path: "",
      imageUri: ""
    },
    {
      id: "3",
      name: "termos de uso e politica de privacidade",
      path: "",
      imageUri: ""
    },
    {
      id: "4",
      name: "excluir conta",
      path: "",
      imageUri: ""
    },
];

export const navigation = (props: any, path: any) => changeScreen(props, path)
