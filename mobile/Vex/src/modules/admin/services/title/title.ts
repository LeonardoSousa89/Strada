import { ApiOperations } from "../../../../interface/operations/operations";
import Http from "../../../comunication/services/web/rest/rest";

export default class OrgTitle implements ApiOperations {
  constructor() {}
  getAll() {}
  async getById() {
    const response = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/join/data?org_id=307`
    );
    return response
  }
  save(): void {}
  update(): void {}
  deleteById(): void {}
  deleteAll(): void {}
}
