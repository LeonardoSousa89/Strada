import OrgContact from "../../entities/org/orgContact";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";

import { orgContactProjection } from '../../repositories/projections/orgProjection'

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
  
  orgContact = new OrgContact(
    this.telephone,
    this.ddd, 
    this.email)
  
  async verifyId(id: string | number) {

    const existsOrNotExistsId = await knex.where('org_contact_id', id)
                                          .from('vex_schema.org_contact')
                                          .first()

    if(existsOrNotExistsId)  return true

    if(!existsOrNotExistsId) return false
  }

  async save() {
      
    await knex.insert(this.orgContact).from('vex_schema.org_contact')
  }

  async update(id?: string | number) {
      
    await knex.where('org_contact_id', id)
              .update(this.orgContact)
              .from('vex_schema.org_contact')
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select(orgContactProjection).from('vex_schema.org_contact') 
    
    return data
  }

  async getById(id?: string | number) {
      
    const data = await knex.where('org_contact_id', id)
                           .select(orgContactProjection)
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