import DriverInformationRelationTable from "../../../entities/driver/relations/driverInformationRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

import { joinDriverAndInformationRelationProjection } from "../../../repositories/projections/joinProjection";

export default class DriverInformationRelationTableService
  extends DriverInformationRelationTable
  implements DbOperations
{
  constructor(
    driver_relation_id?: number,
    information_relation_id?: number,
    org_relation_id?: number
  ) {
    super(driver_relation_id, information_relation_id, org_relation_id);
  }

  driverInformationRelationTable = new DriverInformationRelationTable(
    this.driver_relation_id,
    this.information_relation_id,
    this.org_relation_id
  );

  async verifyRelationshipExists(information_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where("information_relation_id", information_relation_id)
      .from("vex_schema.driver_information_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.driverInformationRelationTable)
      .from("vex_schema.driver_information_relation_table");
  }

  update(id?: string | number): void {}

  async getAll(size?: any, page?: any) {
    const data = await knex
      .select(joinDriverAndInformationRelationProjection)
      .from("vex_schema.driver_information_relation_table");

    return data;
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}
}
