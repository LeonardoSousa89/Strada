"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrgAddress {
    constructor(zip_code, street_type, public_place, number, complement, neighborhood, county, country) {
        this.zip_code = zip_code;
        this.street_type = street_type;
        this.public_place = public_place;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.county = county;
        this.country = country;
    }
}
exports.default = OrgAddress;
