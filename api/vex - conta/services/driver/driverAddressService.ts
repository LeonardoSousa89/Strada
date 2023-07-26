import knex from '../../repositories/knex/knex'
import { DbOperations } from '../../interface/operations';
import DriverAddress from '../../entities/driver/driverAddress';

export default class DriverAddressService extends DriverAddress implements DbOperations {
    
    constructor(zip_code?: string, 
                state?: string,
                city?: string 
    ) {
        super(zip_code,
              state,
              city)
    }

    driverAddressService = new DriverAddress(this.zip_code, 
                        this.state, 
                        this.city)
    
    async getZipCode(axios?: any, url?: string){

        const data = await axios.get(url)
        
        return data.data
    }

    async verifyId(id: string) {

        const existsOrNotExists = await knex.where('driver_address_id', id)
                                            .from('vex_schema.driver_address')
                                            .first()

        if(existsOrNotExists)  return true

        if(!existsOrNotExists) return false
    }

    async save(){
        
        await knex.insert(this.driverAddressService).from('vex_schema.driver_address')
    }

    async update(id?: string | number){

        await knex.where('driver_address_id', id)
                  .update(this.driverAddressService)
                  .from('vex_schema.driver_address')
    }

    async getAll() {

        const data = await knex.select('*')
                              .from('vex_schema.driver_address')

        return data
    }

    async getById(id?: string | number){

        const data = await knex.where('driver_address_id', id)
                               .select('*')
                               .from('vex_schema.driver_address')

        return data
    }

    async deleteAll(){

        await knex.delete().from('vex_schema.driver_address')
    }

    async deleteById(id?: string | number){

        await knex.where('driver_address_id', id)
                  .delete()
                  .from('vex_schema.driver_address')
    }
}