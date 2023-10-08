"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrgIpDataProvider {
    constructor(ip, hostname, city, region, country, loc, org, postal, timezone, readme) {
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
exports.default = OrgIpDataProvider;
