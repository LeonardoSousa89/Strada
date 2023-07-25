import OrgContact from "../../entities/org/orgContact";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";

export default class OrgContactService extends OrgContact implements DbOperations{

  constructor(
    telephone?: string,
    ddd?: string,
    email?: string){

    super(
        telephone,
        ddd, 
        email)
  }
  
  organizationAddress = new OrgContact(
    this.telephone,
    this.ddd, 
    this.email)
  
  async verifyId(id: string | number) {

    const existsOrNotExists = await knex.where('org_contact_id', id)
                                    .from('vex_schema.org_contact')
                                    .first()

    if(existsOrNotExists)  return true

    if(!existsOrNotExists) return false
  }

  async save() {
      
    await knex.insert(this.organizationAddress).from('vex_schema.org_contact')
  }

  async update(id?: string | number) {
      
    await knex.where('org_contact_id', id)
              .update(this.organizationAddress)
              .from('vex_schema.org_contact')
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*').from('vex_schema.org_contact') 
    
    return data
  }

  async getById(id?: string | number) {
      
    const data = await knex.where('org_contact_id', id)
                           .select('*')
                           .from('vex_schema.org_contact') 
    return data
  }

  deleteAll(): void {}

  async deleteById(id?: string | number) {
      
    await knex.where('org_contact_id', id)
              .delete()
              .from('vex_schema.org_contact')
  }
}