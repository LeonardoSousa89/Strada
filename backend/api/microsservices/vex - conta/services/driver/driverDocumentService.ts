import knex from "../../repositories/knex/knex";
import { DbOperations } from "../../interface/operations";
import DriverDocument from "../../entities/driver/driverDocument";

import { driverDocumentProjection } from "../../repositories/projections/driverProjection";
import Cryptography from "../../config/security/cryptography";
import calculatePage from "../../repositories/knex/paginate";

export default class DriverDocumentService
  extends DriverDocument
  implements DbOperations
{
  constructor(cnh?: string) {
    super(cnh);
  }

  driverDocument = new DriverDocument(this.cnh);

  cryptography = new Cryptography();

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_document_id", id)
      .from("vex_schema.driver_document")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyDocument(cnh: string) {
    const data = await knex
      .select(driverDocumentProjection)
      .from("vex_schema.driver_document");

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].cnh = this.cryptography.decrypt(
        data[cipherDataPosition].cnh
      );
    }

    const search = data.find((dataElement) => dataElement.cnh === cnh);

    if (!search) return false;

    return true;
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

  async getAll(page?: any, size?: any) {
    page = calculatePage(page, size);

    const data = await knex
      .select(driverDocumentProjection)
      .from("vex_schema.driver_document")
      .offset(page)
      .limit(size);

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].cnh = this.cryptography.decrypt(
        data[cipherDataPosition].cnh
      );
    }

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_document_id", id)
      .select(driverDocumentProjection)
      .from("vex_schema.driver_document");

    if (data.length === 0) return "driver document not found";

    data[0].cnh = this.cryptography.decrypt(data[0].cnh);

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
