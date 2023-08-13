import OrgAddressRelationTable from "../../../entities/org/relations/orgAddressRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

import { joinOrgAndAddressRelationProjection } from "../../../repositories/projections/joinProjection";

export default class OrgAddressRelationTableService
  extends OrgAddressRelationTable
  implements DbOperations
{
  constructor(org_address_relation_id?: number, org_relation_id?: number) {
    super(org_address_relation_id, org_relation_id);
  }

  orgAddressRelationTable = new OrgAddressRelationTable(
    this.org_address_relation_id,
    this.org_relation_id
  );

  async verifyRelationshipExists(org_address_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where("org_address_relation_id", org_address_relation_id)
      .from("vex_schema.org_address_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.orgAddressRelationTable)
      .from("vex_schema.org_address_relation_table");
  }

  update(id?: string | number): void {}

  async getAll(size?: any, page?: any) {
    const data = await knex
      .select(joinOrgAndAddressRelationProjection)
      .from("vex_schema.org_address_relation_table");

    return data;
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}
}
