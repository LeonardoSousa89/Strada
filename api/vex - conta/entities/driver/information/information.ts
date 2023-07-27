export default class Information {

    starting_km?: string
    final_km?: string
    plate?: string
    notes?: string

    constructor(starting_km?: string,
                final_km?: string,
                plate?: string,
                notes?: string
    ){

        this.starting_km = starting_km
        this.final_km = final_km
        this.plate = plate
        this.notes = notes
    }
}