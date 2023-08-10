export default class OrgContactRelationTable {

    org_contact_relation_id?: number
    org_relation_id?: number

    constructor(
        org_contact_relation_id?: number,
        org_relation_id?: number,
    ){

        this.org_contact_relation_id  = org_contact_relation_id 
        this.org_relation_id  = org_relation_id 
    }
}
