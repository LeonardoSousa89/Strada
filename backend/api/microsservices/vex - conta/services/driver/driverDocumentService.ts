import knex from "../../repositories/knex/knex";
import { DbOperations } from "../../interface/operations";
import DriverDocument from "../../entities/driver/driverDocument";

import { driverDocumentProjection } from "../../repositories/projections/driverProjection";

export default class DriverDocumentService
  extends DriverDocument
  implements DbOperations
{
  constructor(cnh?: string) {
    super(cnh);
  }

  driverDocument = new DriverDocument(this.cnh);

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_document_id", id)
      .from("vex_schema.driver_document")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyDocument(cnh: string) {
    const existsOrNotExistsCnh = await knex
      .where("cnh", cnh)
      .from("vex_schema.driver_document")
      .first();

    if (existsOrNotExistsCnh) return true;

    if (!existsOrNotExistsCnh) return false;
  }

  async save() {
    await knex.insert(this.driverDocument).from("vex_schema.driver_document");
  }

  async update(id?: string | number) {
    await knex
      .where("driver_document_id", id)
      .update(this.driverDocument)
      .from("vex_schema.driver_document");
  }

  async getAll() {
    const data = await knex
      .select(driverDocumentProjection)
      .from("vex_schema.driver_document");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_document_id", id)
      .select(driverDocumentProjection)
      .from("vex_schema.driver_document");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver_document");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("driver_document_id", id)
      .delete()
      .from("vex_schema.driver_document");
  }
}
