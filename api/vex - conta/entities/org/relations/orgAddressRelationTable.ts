export default class OrgAddressRelationTable {

    org_address_id?: number
    org_id?: number

    constructor(
        org_address_id?: number,
        org_id?: number,
    ){

        this.org_address_id  = org_address_id 
        this.org_id  = org_id 
    }
}
