import InformationMidiaUriRelationTable from "../../../../entities/driver/information/relations/informationMidiaUriRelationTable";
import { DbOperations } from "../../../../interface/operations";
import knex from "../../../../repositories/knex/knex";

import { joinInformationAndMidiaUriRelationProjection } from "../../../../repositories/projections/joinProjection";

export default class InformationMidiaUriRelationTableService
  extends InformationMidiaUriRelationTable
  implements DbOperations
{
  constructor(
    midia_uri_relation_id?: number,
    information_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number
  ) {
    super(
      midia_uri_relation_id,
      information_relation_id,
      driver_relation_id,
      org_relation_id
    );
  }

  informationMidiaUriRelationTable = new InformationMidiaUriRelationTable(
    this.midia_uri_relation_id,
    this.information_relation_id,
    this.driver_relation_id,
    this.org_relation_id
  );

  async verifyId(id: number) {
    const existsOrNotExistsId = await knex
      .where("midia_uri_relation_table_id", id)
      .from("vex_schema.information_midia_uri_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyRelationshipExists(midia_uri_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where("midia_uri_relation_id", midia_uri_relation_id)
      .from("vex_schema.information_midia_uri_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.informationMidiaUriRelationTable)
      .from("vex_schema.information_midia_uri_relation_table");
  }

  update(id?: string | number) {}

  async getAll(size?: any, page?: any) {
    const data = await knex
      .select(joinInformationAndMidiaUriRelationProjection)
      .from("vex_schema.information_midia_uri_relation_table");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("midia_uri_relation_table_id", id)
      .select(joinInformationAndMidiaUriRelationProjection)
      .from("vex_schema.information_midia_uri_relation_table");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.information_midia_uri_relation_table");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("midia_uri_relation_table_id", id)
      .delete()
      .from("vex_schema.information_midia_uri_relation_table");
  }
}
