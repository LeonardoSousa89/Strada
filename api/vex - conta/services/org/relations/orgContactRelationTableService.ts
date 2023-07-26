import OrgContactRelationTable from "../../../entities/org/relations/orgContactRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

export default class OrgContactRelationTableService extends OrgContactRelationTable implements DbOperations{

  constructor(
    org_contact_relation_id?: number,
    org_relation_id?: number){

    super(
        org_contact_relation_id,
        org_relation_id)
  }
  
  orgContactRelationTableService = new OrgContactRelationTable(
    this.org_contact_relation_id,
    this.org_relation_id)

  async save() {
      
    await knex.insert(this.orgContactRelationTableService)
              .from('vex_schema.org_contact_relation_table')
  }

  update(id?: string | number): void {
      
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*')
                           .from('vex_schema.org_contact_relation_table') 
    
    return data
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}
}