"use strict";
class OrgAddress {
    constructor(org_address_id, zip_code, street_type, public_place, number, complement, neighborhood, county, country) {
        this.org_address_id = org_address_id;
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
