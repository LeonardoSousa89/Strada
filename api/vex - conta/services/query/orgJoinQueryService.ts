import knex from '../../repositories/knex/knex'
import { organizationProjection,
         joinOrgAndAddressProjection, 
         joinOrgAndContactProjection,
         joinOrgAndDriverProjection 
} from '../../repositories/projections/OrgProjection';
import { DbOperations } from '../../interface/operations';

export default class OrgJoinQuery implements DbOperations {

    constructor() {}

    save(){}

    update(){}

    getAll() {}

    async getById(org_id?: number){

        const organization = await knex.select(organizationProjection)
                                       .from('vex_schema.org')
                                       .where('org.org_id', org_id) 

        const orgAndAddress = await knex.select(joinOrgAndAddressProjection)
                                        .from('vex_schema.org_address_relation_table')
                                        .innerJoin('vex_schema.org', 
                                          'org_address_relation_table.org_relation_id', 
                                          'org.org_id')
                                        .innerJoin('vex_schema.org_address', 
                                          'org_address_relation_table.org_address_relation_id', 
                                          'org_address.org_address_id')
                                        .where('org.org_id', org_id) 

        const orgAndContact = await knex.select(joinOrgAndContactProjection)
                                        .from('vex_schema.org_contact_relation_table')
                                        .innerJoin('vex_schema.org', 
                                          'org_contact_relation_table.org_relation_id', 
                                          'org.org_id')
                                        .innerJoin('vex_schema.org_contact', 
                                          'org_contact_relation_table.org_contact_relation_id', 
                                          'org_contact.org_contact_id')
                                        .where('org.org_id', org_id)

        const orgAndDriver = await  knex.select(joinOrgAndDriverProjection)
                                        .from('vex_schema.org_driver_relation_table')
                                        .innerJoin('vex_schema.org', 
                                          'org_driver_relation_table.org_relation_id', 
                                          'org.org_id')
                                        .innerJoin('vex_schema.driver', 
                                          'org_driver_relation_table.driver_relation_id', 
                                          'driver.driver_id')
                                        .where('org.org_id', org_id)
                                        
        return {
            data: {
                organization,
                address: orgAndAddress,
                contact: orgAndContact,
                drivers:  orgAndDriver
            }
        }
    }

    deleteAll(){}

    deleteById(){}
}