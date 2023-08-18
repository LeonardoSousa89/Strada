import Cryptography from "../../config/security/cryptography";
import Org from "../../entities/org/org";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";
import calculatePage from "../../repositories/paginate";

import { orgProjection } from "../../repositories/projections/OrgProjection";

export default class OrgService extends Org implements DbOperations {
  constructor(
    fantasy_name?: string,
    corporate_name?: string,
    cnpj?: string,
    org_status?: string,
    cnae_main_code?: string,
    open_date?: string,
    password?: string
  ) {
    super(
      fantasy_name,
      corporate_name,
      cnpj,
      org_status,
      cnae_main_code,
      open_date,
      password
    );
  }

  org = new Org(
    this.fantasy_name,
    this.corporate_name,
    this.cnpj,
    this.org_status,
    this.cnae_main_code,
    this.open_date,
    this.password
  );

  cryptography = new Cryptography();

  async verifyCnpj(cnpj: string) {
    const data = await knex.select(orgProjection).from("vex_schema.org");

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].cnpj = this.cryptography.decrypt(
        data[cipherDataPosition].cnpj
      );
    }

    const search = data.find((dataElement) => dataElement.cnpj === cnpj);

    if (!search) return false;

    return true;
  }

  async verifyId(id: string | number) {
    const existsOrNotExistsId = await knex
      .where("org_id", id)
      .from("vex_schema.org")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex.insert(this.org).from("vex_schema.org");
  }

  async update(id?: number | string) {
    await knex.where("org_id", id).update(this.org).from("vex_schema.org");
  }

  async getAll(page?: any, size?: any) {
    page = calculatePage(page, size);

    const data = await knex
      .select(orgProjection)
      .from("vex_schema.org")
      .offset(page)
      .limit(size);

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].fantasy_name = this.cryptography.decrypt(
        data[cipherDataPosition].fantasy_name
      );
      data[cipherDataPosition].corporate_name = this.cryptography.decrypt(
        data[cipherDataPosition].corporate_name
      );
      data[cipherDataPosition].cnpj = this.cryptography.decrypt(
        data[cipherDataPosition].cnpj
      );
      data[cipherDataPosition].org_status = this.cryptography.decrypt(
        data[cipherDataPosition].org_status
      );
      data[cipherDataPosition].cnae_main_code = this.cryptography.decrypt(
        data[cipherDataPosition].cnae_main_code
      );
      data[cipherDataPosition].open_date = this.cryptography.decrypt(
        data[cipherDataPosition].open_date
      );
    }

    return data;
  }

  async getById(id?: number | string) {
    const data = await knex
      .where("org_id", id)
      .select(orgProjection)
      .from("vex_schema.org");

    if (data.length === 0) return "org not found";

    data[0].fantasy_name = this.cryptography.decrypt(data[0].fantasy_name);
    data[0].corporate_name = this.cryptography.decrypt(data[0].corporate_name);
    data[0].cnpj = this.cryptography.decrypt(data[0].cnpj);
    data[0].org_status = this.cryptography.decrypt(data[0].org_status);
    data[0].cnae_main_code = this.cryptography.decrypt(data[0].cnae_main_code);
    data[0].open_date = this.cryptography.decrypt(data[0].open_date);

    return data;
  }

  async deleteAll() {}

  async deleteById(id?: number | string) {
    await knex.where("org_id", id).delete().from("vex_schema.org");
  }
}
