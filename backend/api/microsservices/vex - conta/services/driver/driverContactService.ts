import knex from "../../repositories/knex/knex";
import { DbOperations } from "../../interface/operations";
import DriverContact from "../../entities/driver/driverContact";

import { driverContactProjection } from "../../repositories/projections/driverProjection";
import Cryptography from "../../config/security/cryptography";

export default class DriverContactService
  extends DriverContact
  implements DbOperations
{
  constructor(telephone?: string) {
    super(telephone);
  }

  driverContact = new DriverContact(this.telephone);

  cryptography = new Cryptography();

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_contact_id", id)
      .from("vex_schema.driver_contact")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex.insert(this.driverContact).from("vex_schema.driver_contact");
  }

  async update(id?: string | number) {
    await knex
      .where("driver_contact_id", id)
      .update(this.driverContact)
      .from("vex_schema.driver_contact");
  }

  async getAll() {
    const data = await knex
      .select(driverContactProjection)
      .from("vex_schema.driver_contact");

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].telephone = this.cryptography.decrypt(
        data[cipherDataPosition].telephone
      );
    }
      
    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_contact_id", id)
      .select(driverContactProjection)
      .from("vex_schema.driver_contact");

    if (data.length === 0) return "driver contact not found";

    data[0].telephone = this.cryptography.decrypt(data[0].telephone);

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver_contact");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("driver_contact_id", id)
      .delete()
      .from("vex_schema.driver_contact");
  }
}
