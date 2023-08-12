import { cipher, decipher } from "../../security/cryptography/crypto";
import OrgService from "../../services/org/orgService";
import { cryptograph } from "../../security/cryptography/bcrypt";
import knex from "../../repositories/knex/knex";
import { orgProjection } from "../../repositories/projections/OrgProjection";

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

    const data = await knex.select(orgProjection).from('vex_schema.org')    

    for(let cipherDataPosition in data){

        data[cipherDataPosition].fantasy_name = decipher(data[cipherDataPosition].fantasy_name)
        data[cipherDataPosition].corporate_name = decipher(data[cipherDataPosition].corporate_name)
        data[cipherDataPosition].cnpj = decipher(data[cipherDataPosition].cnpj)
        data[cipherDataPosition].org_status = decipher(data[cipherDataPosition].org_status)
        data[cipherDataPosition].cnae_main_code = decipher(data[cipherDataPosition].cnae_main_code)
        data[cipherDataPosition].open_date = decipher(data[cipherDataPosition].open_date)
    }

    return data
 }