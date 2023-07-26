export default class DriverAddress {

    zip_code?: string
    state?: string
    city?: string

    constructor(zip_code?: string,
                state?: string,
                city?: string
    ){

        this.zip_code = zip_code
        this.state = state
        this.city = city
    }
}