export default class OrgAddressRelationTable {

    org_address_relation_id?: number
    org_relation_id?: number

    constructor(
        org_address_relation_id?: number,
        org_relation_id?: number,
    ){

        this.org_address_relation_id  = org_address_relation_id 
        this.org_relation_id  = org_relation_id 
    }
}
