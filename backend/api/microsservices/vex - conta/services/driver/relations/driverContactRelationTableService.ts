import DriverContactRelationTable from "../../../entities/driver/relations/driverContactRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

import { joinDriverAndContactRelationProjection } from "../../../repositories/projections/joinProjection";

export default class DriverContactRelationTableService extends DriverContactRelationTable implements DbOperations{

  constructor(
    driver_contact_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number){

    super(
        driver_contact_relation_id,
        driver_relation_id,
        org_relation_id)
  }
  
  driverContactRelationTable = new DriverContactRelationTable(
    this.driver_contact_relation_id,
    this.driver_relation_id,
    this.org_relation_id)

  async verifyRelationshipExists(driver_contact_relation_id: number){

    const existsOrNotExistsId = await knex.where('driver_contact_relation_id', driver_contact_relation_id)
                                          .from('vex_schema.driver_contact_relation_table')
                                          .first()
        
    if(existsOrNotExistsId)  return true
        
    if(!existsOrNotExistsId) return false
  }

  async save() {
      
    await knex.insert(this.driverContactRelationTable)
              .from('vex_schema.driver_contact_relation_table')
  }

  update(id?: string | number): void {
      
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select(joinDriverAndContactRelationProjection)
                           .from('vex_schema.driver_contact_relation_table') 
    
    return data
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}

}