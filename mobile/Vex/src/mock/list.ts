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

export let info: any = {
    id: "1",
    name: "Alberto Filho de Sousa",
    cnh: "95206727377",
    celphone: "71 95869-9685",
    email: "beto@email.com",
    zipCode: "41000100",
    state: "Bahia",
    city: "Salvador",
    imageUri: "",
}

export const navigation = (props: any, path: any) => changeScreen(props, path);
