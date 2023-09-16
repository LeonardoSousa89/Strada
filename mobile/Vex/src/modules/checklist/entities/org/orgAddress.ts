export default class OrgAddress {
  zip_code?: string;
  street_type?: string;
  public_place?: string;
  org_number?: string;
  complement?: string;
  neighborhood?: string;
  county?: string;
  country?: string;

  constructor(
    zip_code?: string,
    street_type?: string,
    public_place?: string,
    org_number?: string,
    complement?: string,
    neighborhood?: string,
    county?: string,
    country?: string
  ) {
    this.zip_code = zip_code;
    this.street_type = street_type;
    this.public_place = public_place;
    this.org_number = org_number;
    this.complement = complement;
    this.neighborhood = neighborhood;
    this.county = county;
    this.country = country;
  }
}
