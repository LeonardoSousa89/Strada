export default class OrgContactRelationTable {

    org_contact_id?: number
    org_id?: number

    constructor(
        org_contact_id?: number,
        org_id?: number,
    ){

        this.org_contact_id  = org_contact_id 
        this.org_id  = org_id 
    }
}
