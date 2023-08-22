import DriveAddressRelationTable from "../../../entities/driver/relations/driverAddressRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

import { joinDriverAndAddressRelationProjection } from "../../../repositories/projections/joinProjection";

export default class DriverAddressRelationTableService
  extends DriveAddressRelationTable
  implements DbOperations
{
  constructor(
    driver_address_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number
  ) {
    super(driver_address_relation_id, driver_relation_id, org_relation_id);
  }

  driveAddressRelationTable = new DriveAddressRelationTable(
    this.driver_address_relation_id,
    this.driver_relation_id,
    this.org_relation_id
  );

  async verifyId(id: number) {
    const existsOrNotExistsId = await knex
      .where("driver_address_relation_table_id", id)
      .from("vex_schema.driver_address_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyRelationshipExists(driver_address_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where("driver_address_relation_id", driver_address_relation_id)
      .from("vex_schema.driver_address_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.driveAddressRelationTable)
      .from("vex_schema.driver_address_relation_table");
  }

  update(id?: string | number): void {}

  async getAll(size?: any, page?: any) {
    const data = await knex
      .select(joinDriverAndAddressRelationProjection)
      .from("vex_schema.driver_address_relation_table");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_address_relation_table_id", id)
      .select(joinDriverAndAddressRelationProjection)
      .from("vex_schema.driver_address_relation_table");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver_address_relation_table");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("driver_address_relation_table_id", id)
      .delete()
      .from("vex_schema.driver_address_relation_table");
  }
}
