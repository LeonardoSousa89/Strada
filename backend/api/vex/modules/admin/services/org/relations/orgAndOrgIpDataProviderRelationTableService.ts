import OrgAndOrgIpDataProviderRelationTable from "../../../../admin/entities/org/relations/orgAndOrgIpDataProviderRelationTable";
import { DbOperations } from "../../../../../interface/operations";
import knex from "../../../../../repositories/knex/knex";

import { joinOrgAndOrgIpDataProviderRelationProjection } from "../../../entities/org/projections/joinProjection";

export default class OrgAndOrgIpDataProviderRelationTableService
  extends OrgAndOrgIpDataProviderRelationTable
  implements DbOperations
{
  constructor(
    org_ip_data_provider_relation_id?: number,
    org_relation_id?: number
  ) {
    super(org_ip_data_provider_relation_id, org_relation_id);
  }

  orgAndOrgIpDataProviderTableService =
    new OrgAndOrgIpDataProviderRelationTable(
      this.org_ip_data_provider_relation_id,
      this.org_relation_id
    );

  async verifyId(id: number) {
    const existsOrNotExistsId = await knex
      .where("org_ip_data_provider_relation_table_id", id)
      .from("vex_schema.org_ip_data_provider_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyRelationshipExists(org_ip_data_provider_relation_id: number) {
    const existsOrNotExistsId = await knex
      .where(
        "org_ip_data_provider_relation_id",
        org_ip_data_provider_relation_id
      )
      .from("vex_schema.org_ip_data_provider_relation_table")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.orgAndOrgIpDataProviderTableService)
      .from("vex_schema.org_ip_data_provider_relation_table");
  }

  update(id?: string | number): void {}

  async getAll(page?: any, size?: any) {
    const data = await knex
      .select(joinOrgAndOrgIpDataProviderRelationProjection)
      .from("vex_schema.org_ip_data_provider_relation_table");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("org_ip_data_provider_relation_table_id", id)
      .select(joinOrgAndOrgIpDataProviderRelationProjection)
      .from("vex_schema.org_ip_data_provider_relation_table");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.org_ip_data_provider_relation_table");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("org_ip_data_provider_relation_table_id", id)
      .delete()
      .from("vex_schema.org_ip_data_provider_relation_table");
  }
}
