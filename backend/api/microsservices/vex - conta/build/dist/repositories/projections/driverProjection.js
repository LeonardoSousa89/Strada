"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverDocumentProjection = exports.driverContactProjection = exports.driverAddressProjection = exports.driverProjection = void 0;
const driverProjection = [
    'driver.driver_id',
    'driver.first_name',
    'driver.last_name',
    'driver.email'
];
exports.driverProjection = driverProjection;
const driverAddressProjection = [
    'driver_address.driver_address_id',
    'driver_address.zip_code ',
    'driver_address.state',
    'driver_address.city'
];
exports.driverAddressProjection = driverAddressProjection;
const driverContactProjection = [
    'driver_contact.driver_contact_id',
    'driver_contact.telephone'
];
exports.driverContactProjection = driverContactProjection;
const driverDocumentProjection = [
    'driver_document.driver_document_id',
    'driver_document.cnh'
];
exports.driverDocumentProjection = driverDocumentProjection;
