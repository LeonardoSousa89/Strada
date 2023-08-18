import Cryptography from "../../config/security/cryptography";
import OrgContact from "../../entities/org/orgContact";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";
import calculatePage from "../../repositories/paginate";

import { orgContactProjection } from "../../repositories/projections/OrgProjection";

export default class OrgContactService
  extends OrgContact
  implements DbOperations
{
  constructor(telephone?: string, ddd?: string, email?: string) {
    super(telephone, ddd, email);
  }

  orgContact = new OrgContact(this.telephone, this.ddd, this.email);

  cryptography = new Cryptography();

  async verifyId(id: string | number) {
    const existsOrNotExistsId = await knex
      .where("org_contact_id", id)
      .from("vex_schema.org_contact")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex.insert(this.orgContact).from("vex_schema.org_contact");
  }

  async update(id?: string | number) {
    await knex
      .where("org_contact_id", id)
      .update(this.orgContact)
      .from("vex_schema.org_contact");
  }

  async getAll(page?: any, size?: any) {
    page = calculatePage(page, size);

    const data = await knex
      .select(orgContactProjection)
      .from("vex_schema.org_contact")
      .offset(page)
      .limit(size);

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].telephone = this.cryptography.decrypt(
        data[cipherDataPosition].telephone
      );
      data[cipherDataPosition].ddd = this.cryptography.decrypt(
        data[cipherDataPosition].ddd
      );
      data[cipherDataPosition].email = this.cryptography.decrypt(
        data[cipherDataPosition].email
      );
    }

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("org_contact_id", id)
      .select(orgContactProjection)
      .from("vex_schema.org_contact");

    if (data.length === 0) return "org contact not found";

    data[0].telephone = this.cryptography.decrypt(data[0].telephone);
    data[0].ddd = this.cryptography.decrypt(data[0].ddd);
    data[0].email = this.cryptography.decrypt(data[0].email);

    return data;
  }

  deleteAll() {}

  async deleteById(id?: string | number) {
    await knex
      .where("org_contact_id", id)
      .delete()
      .from("vex_schema.org_contact");
  }
}
