import { changeScreen } from "../modules/checklist/controllers/navigate/navigate";

export let list: any = [
  {
    id: "1",
    name: "Alberto Filho",
    path: "driver-config",
    imageUri: "",
  },
  {
    id: "2",
    name: "Gilson Néris",
    path: "driver-config",
    imageUri: "",
  },
  {
    id: "3",
    name: "Robson Leitão",
    path: "driver-config",
    imageUri: "",
  },
];

export const navigation = (props: any, path: any) => changeScreen(props, path);
