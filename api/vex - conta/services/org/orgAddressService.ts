import OrgAddress from "../../entities/org/orgAddress";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";

export default class OrgAddressService extends OrgAddress implements DbOperations{

  constructor(
    zip_code?: string,
    street_type?: string,
    public_place?: string,
    org_number?: string,
    complement?: string,
    neighborhood?: string,
    county?: string,
    country?: string){

    super(
        zip_code,
        street_type, 
        public_place, 
        org_number, 
        complement, 
        neighborhood, 
        county, 
        country)
  }
  
  organizationAddress = new OrgAddress(
    this.zip_code,
    this.street_type, 
    this.public_place, 
    this.org_number, 
    this.complement, 
    this.neighborhood, 
    this.county, 
    this.country)

  
  async verifyId(id: string | number) {

    const existsOrNotExists = await knex.where('org_address_id', id)
                                    .from('vex_schema.org_address')
                                    .first()

    if(existsOrNotExists)  return true

    if(!existsOrNotExists) return false
  }

  async save() {
      
    await knex.insert(this.organizationAddress).from('vex_schema.org_address')
  }

  async update(id: string | number) {
      
    await knex.where('org_address_id', id)
              .update(this.organizationAddress)
              .from('vex_schema.org_address')
  }

  async getAll(size?: any, page?:any) {
      
    const data = await knex.select('*').from('vex_schema.org_address') 
    
    return data
  }

  async getById(id: string | number) {
      
    const data = await knex.where('org_address_id', id)
                           .select('*')
                           .from('vex_schema.org_address') 
    return data
  }

  async deleteById(id: string | number) {
      
    await knex.where('org_address_id', id)
              .delete()
              .from('vex_schema.org_address')
  }
}