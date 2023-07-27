import knex from '../../../repositories/knex/knex'
import { DbOperations } from '../../../interface/operations';
import Information from '../../../entities/driver/information/information';

export default class InformationService extends Information implements DbOperations {
    
    constructor(starting_km?: string,
                final_km?: string, 
                plate?: string,
                notes?: string 
    ) {
        super(starting_km,
              final_km,
              plate,
              notes)
    }

    information = new Information(this.starting_km,
                        this.final_km, 
                        this.plate, 
                        this.notes)

    async verifyId(id: string) {

        const existsOrNotExists = await knex.where('information_id', id)
                                            .from('vex_schema.information')
                                            .first()

        if(existsOrNotExists)  return true

        if(!existsOrNotExists) return false
    }
    
    verifyInformation(starting_km: string, final_km: string) {

        if(starting_km === null && 
           final_km === null) return false
           
        if(starting_km === '' && 
            final_km === '') return false 
            
        if(starting_km === null && 
            final_km === '') return false 
        
        if(starting_km === '' && 
           final_km === null) return false 
    }

    async save(){
        
        await knex.insert(this.information).from('vex_schema.information')
    }

    async update(id?: string | number){

        await knex.where('information_id', id)
                  .update(this.information)
                  .from('vex_schema.information')
    }

    async getAll() {

        const data = await knex.select('*')
                              .from('vex_schema.information')

        return data
    }

    async getById(id?: string | number){

        const data = await knex.where('information_id', id)
                               .select('*')
                               .from('vex_schema.information')

        return data
    }

    async deleteAll(){

        await knex.delete().from('vex_schema.information')
    }

    async deleteById(id?: string | number){

        await knex.where('information_id', id)
                  .delete()
                  .from('vex_schema.information')
    }
}