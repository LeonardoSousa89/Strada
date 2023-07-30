"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinDriverAndInformationProjection = exports.joinDriverAndDocumentProjection = exports.joinDriverAndContactProjection = exports.joinDriverAndAddressProjection = exports.joinOrgAndDriverProjection = void 0;
const joinOrgAndDriverProjection = [
    'driver.driver_id',
    'driver.first_name',
    'driver.last_name',
    'driver.email'
];
exports.joinOrgAndDriverProjection = joinOrgAndDriverProjection;
const joinDriverAndAddressProjection = [
    'driver_address.driver_address_id',
    'driver_address.zip_code ',
    'driver_address.state',
    'driver_address.city',
    'driver.driver_id'
];
exports.joinDriverAndAddressProjection = joinDriverAndAddressProjection;
const joinDriverAndContactProjection = [
    'driver_contact.driver_contact_id',
    'driver_contact.telephone',
    'driver.driver_id'
];
exports.joinDriverAndContactProjection = joinDriverAndContactProjection;
const joinDriverAndDocumentProjection = [
    'driver_document.driver_document_id',
    'driver_document.cnh',
    'driver.driver_id'
];
exports.joinDriverAndDocumentProjection = joinDriverAndDocumentProjection;
const joinDriverAndInformationProjection = [
    'information.information_id',
    'information.starting_km',
    'information.final_km',
    'information.plate',
    'information.notes',
    'driver.driver_id'
];
exports.joinDriverAndInformationProjection = joinDriverAndInformationProjection;
