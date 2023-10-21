import * as dotenv from "dotenv";
import { RestOperations } from "../../../../interface/operations";
import axios from "axios";

dotenv.config();

export default class cnpjQuery implements RestOperations {
  private cnpj: any = "";

  constructor(cnpj: any) {
    this.cnpj = cnpj;
  }
  async GET() {
    const response = await axios.get(
      `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${this.cnpj}`
    );
    return response.data;
  }

  POST() {}

  PUT() {}

  DELETE() {}
}
