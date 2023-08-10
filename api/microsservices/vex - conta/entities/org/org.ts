export default class Org {

    fantasy_name?: string
    corporate_name?: string
    cnpj?: string
    org_status?: string
    cnae_main_code?: string
    open_date?: string
    password?: string

    public constructor(fantasy_name?: string,
                corporate_name?: string,
                cnpj?: string,
                org_status?: string,
                cnae_main_code?: string,
                open_date?: string,
                password?: string
            ){

        this.fantasy_name = fantasy_name
        this.corporate_name = corporate_name
        this.cnpj = cnpj
        this.org_status = org_status
        this.cnae_main_code = cnae_main_code
        this.open_date = open_date
        this.password = password
    }
}
