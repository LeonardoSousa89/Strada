import { changeScreen } from "../../controllers/navigate/navigate";

export const list = [
    {
      id: "1",
      name: "checklist",
      path: "checklist",
      imageUri: "../../../../assets/screens/list_of_services/checklisty.png"
    }
];

export const navigation = (props: any, path: any) => changeScreen(props, path)
