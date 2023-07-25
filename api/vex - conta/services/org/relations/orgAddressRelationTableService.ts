import OrgAddressRelationTable from "../../../entities/org/relations/orgAddressRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

export default class OrgAddressRelationTableService extends OrgAddressRelationTable implements DbOperations{

  constructor(
    org_address_relation_id?: number,
    org_relation_id?: number){

    super(
        org_address_relation_id,
        org_relation_id)
  }
  
  organizationAddressRelationTable = new OrgAddressRelationTable(
    this.org_address_relation_id,
    this.org_relation_id)

  async save() {
      
    await knex.insert(this.organizationAddressRelationTable).from('vex_schema.org_address_relation_table')
  }

  update(id?: string | number): void {
      
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*').from('vex_schema.org_address_relation_table') 
    
    return data
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}

}