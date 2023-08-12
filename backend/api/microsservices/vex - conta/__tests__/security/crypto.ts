import { cipher } from "../../security/cryptography/crypto";
import OrgService from "../../services/org/orgService";
import { cryptograph } from "../../security/cryptography/bcrypt";
import knex from "../../repositories/knex/knex";

export async function cipherDataAndSave(data: any) {

    data.fantasy_name = cipher(data.fantasy_name)
    data.corporate_name = cipher(data.corporate_name)
    data.cnpj = cipher(data.cnpj)
    data.org_status = cipher(data.org_status)
    data.cnae_main_code = cipher(data.cnae_main_code)
    data.open_date = cipher(data.open_date) 
     
    data.password = cryptograph(data.password)

    const orgService = new OrgService(data.fantasy_name,
                                      data.corporate_name,
                                      data.cnpj,
                                      data.org_status,
                                      data.cnae_main_code,
                                      data.open_date,
                                      data.password)

    await orgService.save()
 }

 export async function decipherDataAndGet() {

    return await knex.select('*').from('vex_schema.org')    
 }