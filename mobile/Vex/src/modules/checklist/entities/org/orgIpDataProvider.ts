export default class OrgIpDataProvider {
  ip?: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
  readme?: string;

  constructor(
    ip?: string,
    hostname?: string,
    city?: string,
    region?: string,
    country?: string,
    loc?: string,
    org?: string,
    postal?: string,
    timezone?: string,
    readme?: string
  ) {
    this.ip = ip;
    this.hostname = hostname;
    this.city = city;
    this.region = region;
    this.country = country;
    this.loc = loc;
    this.org = org;
    this.postal = postal;
    this.timezone = timezone;
    this.readme = readme;
  }
}
