import knex from "../../../repositories/knex/knex";
import { DbOperations } from "../../../interface/operations";

import { midiaProjection } from "../../../repositories/projections/informationProjection";
import Cryptography from "../../../config/security/cryptography";
import calculatePage from "../../../repositories/paginate";
import Midia from "../../../entities/driver/information/midia";

export default class MidiaService extends Midia implements DbOperations {

  constructor(uri?: string) {
    super(uri);
  }

  information = new Midia(this.uri);

  cryptography = new Cryptography();

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("midia_uri_id", id)
      .from("vex_schema.midia_uri")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex.insert(this.information).from("vex_schema.midia_uri");
  }

  async update(id?: string | number) {
    await knex
      .where("midia_uri_id", id)
      .update(this.information)
      .from("vex_schema.midia_uri");
  }

  async getAll(page?: any, size?: any) {
    page = calculatePage(page, size);

    const data = await knex
      .select(midiaProjection)
      .from("vex_schema.midia_uri")
      .offset(page)
      .limit(size);

    if (data.length === 0) return "no data";

    // for (let cipherDataPosition in data) {
    //   data[cipherDataPosition].uri = this.cryptography.decrypt(
    //     data[cipherDataPosition].uri
    //   );
    // }

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("midia_uri_id", id)
      .select(midiaProjection)
      .from("vex_schema.midia_uri");

    if (data.length === 0) return "midia not found";

    // data[0].uri = this.cryptography.decrypt(data[0].uri);

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.midia_uri");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("midia_uri_id", id)
      .delete()
      .from("vex_schema.midia_uri");
  }
}
