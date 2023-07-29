import Org from "../../entities/org/org";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";

export default class OrgService extends Org implements DbOperations {

    constructor(
        fantasy_name?: string,
        corporate_name?: string,
        cnpj?: string,
        org_status?: string,
        cnae_main_code?: string,
        open_date?: string,
        password?: string
    ){
        super(fantasy_name, 
              corporate_name,
              cnpj,
              org_status,
              cnae_main_code,
              open_date,
              password)
    }
    
    org = new Org( 
        this.fantasy_name, 
        this.corporate_name,
        this.cnpj,
        this.org_status,
        this.cnae_main_code,
        this.open_date,
        this.password)

    async verifyCnpj(cnpj: string) {

        const existsOrNotExistsCnpj = await knex.where('cnpj', cnpj)
                                                .from('vex_schema.org')
                                                .first()

        if(existsOrNotExistsCnpj)  return true

        if(!existsOrNotExistsCnpj) return false
    }

    async verifyId(id: string | number) {

        const existsOrNotExistsId = await knex.where('org_id', id)
                                              .from('vex_schema.org')
                                              .first()

        if(existsOrNotExistsId)  return true

        if(!existsOrNotExistsId) return false
    }

    async save() {

        await knex.insert(this.org).from('vex_schema.org')
    }

    async update(id?: number | string) {
        
        await knex.where('org_id', id)
                  .update(this.org)
                  .from('vex_schema.org')
    }

    async getAll() {

        const data = await knex.select(['org_id',
                                        'fantasy_name', 
                                        'corporate_name',
                                        'cnpj',
                                        'org_status',
                                        'cnae_main_code',
                                        'open_date'])
                               .from('vex_schema.org') 
    
        return data
    }

    async getById(id?: number | string) {
        
        const data = await knex.where('org_id', id)
                               .select(['org_id',
                                        'fantasy_name', 
                                        'corporate_name',
                                        'cnpj',
                                        'org_status',
                                        'cnae_main_code',
                                        'open_date'])
                               .from('vex_schema.org') 
        return data
    }

    deleteAll(): void {}

    async deleteById(id?: number | string) {
        
        await knex.where('org_id', id).delete().from('vex_schema.org') 
    }
}