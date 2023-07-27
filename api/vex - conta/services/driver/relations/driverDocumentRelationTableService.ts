import DriverDocumentRelationTable from "../../../entities/driver/relations/driverDocumentRelationTable";
import { DbOperations } from "../../../interface/operations";
import knex from "../../../repositories/knex/knex";

export default class DriverDocumentRelationTableService extends DriverDocumentRelationTable implements DbOperations{

  constructor(
    driver_document_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number){

    super(
        driver_document_relation_id,
        driver_relation_id,
        org_relation_id)
  }
  
  driverDocumentRelationTable = new DriverDocumentRelationTable(
    this.driver_document_relation_id,
    this.driver_relation_id,
    this.org_relation_id)

  async save() {
      
    await knex.insert(this.driverDocumentRelationTable)
              .from('vex_schema.driver_document_relation_table')
  }

  update(id?: string | number): void {
      
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*')
                           .from('vex_schema.driver_document_relation_table') 
    
    return data
  }

  getById(id?: string | number) {}

  deleteAll(): void {}

  deleteById(id?: string | number): void {}

}