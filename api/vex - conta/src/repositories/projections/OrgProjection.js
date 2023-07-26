"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinOrgAndDriverProjection = exports.joinOrgAndContactProjection = exports.joinOrgAndAddressProjection = exports.organizationProjection = void 0;
const organizationProjection = [
    'org.org_id',
    'org.fantasy_name',
    'org.corporate_name',
    'org.cnpj',
    'org.org_status',
    'org.cnae_main_code',
    'org.open_date'
];
exports.organizationProjection = organizationProjection;
const joinOrgAndAddressProjection = [
    'org_address.org_address_id',
    'org_address.zip_code',
    'org_address.street_type',
    'org_address.public_place',
    'org_address.org_number',
    'org_address.complement',
    'org_address.neighborhood',
    'org_address.county',
    'org_address.country'
];
exports.joinOrgAndAddressProjection = joinOrgAndAddressProjection;
const joinOrgAndContactProjection = [
    'org_contact.org_contact_id',
    'org_contact.ddd',
    'org_contact.telephone',
    'org_contact.email'
];
exports.joinOrgAndContactProjection = joinOrgAndContactProjection;
const joinOrgAndDriverProjection = [
    'driver.driver_id',
    'driver.first_name',
    'driver.last_name',
    'driver.email'
];
exports.joinOrgAndDriverProjection = joinOrgAndDriverProjection;
