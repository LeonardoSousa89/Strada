import OrgContactRelationTable from "../../../entities/org/relations/orgContactRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

import { joinOrgAndContactRelationProjection } from "../../../repositories/projections/joinProjection";

export default class OrgContactRelationTableService
  extends OrgContactRelationTable
  implements DbOperations
{
  constructor(org_contact_relation_id?: number, org_relation_id?: number) {
    super(org_contact_relation_id, org_relation_id);
  }

  orgContactRelationTableService = new OrgContactRelationTable(
    this.org_contact_relation_id,
    this.org_relation_id
  );

  async verifyId(id: number) {
    const existsOrNotExistsId = await knex
      .where("org_contact_relation_table_id", id)
      .from("vex_schema.org_contact_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyRelationshipExists(org_contact_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where("org_contact_relation_id", org_contact_relation_id)
      .from("vex_schema.org_contact_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.orgContactRelationTableService)
      .from("vex_schema.org_contact_relation_table");
  }

  update(id?: string | number): void {}

  async getAll(size?: any, page?: any) {
    const data = await knex
      .select(joinOrgAndContactRelationProjection)
      .from("vex_schema.org_contact_relation_table");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("org_contact_relation_table_id", id)
      .select(joinOrgAndContactRelationProjection)
      .from("vex_schema.org_contact_relation_table");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.org_contact_relation_table");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("org_contact_relation_table_id", id)
      .delete()
      .from("vex_schema.org_contact_relation_table");
  }
}
