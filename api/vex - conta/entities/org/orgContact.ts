class OrgContact {

    org_contact_id: string
    telephone: string
    ddd: string
    email: string

    constructor(org_contact_id: string,
                telephone: string,
                ddd: string,
                email: string
    ){

        this.org_contact_id = org_contact_id
        this.telephone = telephone
        this.ddd = ddd
        this.email = email
    }
}
