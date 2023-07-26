import OrgDriverRelationTable from "../../entities/relations/orgDriverRelationTable";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";

export default class OrgDriverRelationTableService extends OrgDriverRelationTable implements DbOperations{

  constructor(
    driver_relation_id?: number,
    org_relation_id?: number){

    super(
        driver_relation_id,
        org_relation_id)
  }
  
  orgDriverRelationTableService = new OrgDriverRelationTable( 
    this.driver_relation_id,
    this.org_relation_id)

  async save() {
      
    await knex.insert(this.orgDriverRelationTableService)
              .from('vex_schema.org_driver_relation_table')
  }

  async update(){}

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*')
                           .from('vex_schema.org_driver_relation_table') 
    
    return data
  }

  async getById() {}

  async deleteAll() {}

  async deleteById() {}
}