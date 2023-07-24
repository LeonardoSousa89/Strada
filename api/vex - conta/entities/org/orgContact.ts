export default class OrgContact {

    telephone?: string
    ddd?: string
    email?: string

    constructor(telephone?: string,
                ddd?: string,
                email?: string
    ){

        this.telephone = telephone
        this.ddd = ddd
        this.email = email
    }
}
