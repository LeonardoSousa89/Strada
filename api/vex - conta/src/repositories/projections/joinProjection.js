"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinDriverAndInformationProjection = exports.joinDriverAndDocumentProjection = exports.joinDriverAndContactProjection = exports.joinDriverAndAddressProjection = exports.joinDriverAndInformationRelationProjection = exports.joinDriverAndDocumentRelationProjection = exports.joinDriverAndContactRelationProjection = exports.joinDriverAndAddressRelationProjection = exports.joinOrgAndContactRelationProjection = exports.joinOrgAndAddressRelationProjection = void 0;
const joinOrgAndAddressRelationProjection = [
    'org_address_relation_table.org_address_relation_table_id',
    'org_address_relation_table.org_address_relation_id',
    'org_address_relation_table.org_relation_id'
];
exports.joinOrgAndAddressRelationProjection = joinOrgAndAddressRelationProjection;
const joinOrgAndContactRelationProjection = [
    'org_contact_relation_table.org_contact_relation_table_id',
    'org_contact_relation_table.org_contact_relation_id',
    'org_contact_relation_table.org_relation_id'
];
exports.joinOrgAndContactRelationProjection = joinOrgAndContactRelationProjection;
const joinDriverAndAddressRelationProjection = [
    'driver_address_relation_table.driver_address_relation_table_id',
    'driver_address_relation_table.driver_address_relation_id',
    'driver_address_relation_table.driver_relation_id',
    'driver_address_relation_table.org_relation_id'
];
exports.joinDriverAndAddressRelationProjection = joinDriverAndAddressRelationProjection;
const joinDriverAndContactRelationProjection = [
    'driver_contact_relation_table.driver_contact_relation_table_id',
    'driver_contact_relation_table.driver_contact_relation_id',
    'driver_contact_relation_table.driver_relation_id',
    'driver_contact_relation_table.org_relation_id'
];
exports.joinDriverAndContactRelationProjection = joinDriverAndContactRelationProjection;
const joinDriverAndDocumentRelationProjection = [
    'driver_document_relation_table.driver_document_relation_table_id',
    'driver_document_relation_table.driver_document_relation_id',
    'driver_document_relation_table.driver_relation_id',
    'driver_document_relation_table.org_relation_id'
];
exports.joinDriverAndDocumentRelationProjection = joinDriverAndDocumentRelationProjection;
const joinDriverAndInformationRelationProjection = [
    'driver_information_relation_table.driver_information_relation_table_id',
    'driver_information_relation_table.driver_relation_id',
    'driver_information_relation_table.information_relation_id',
    'driver_information_relation_table.org_relation_id'
];
exports.joinDriverAndInformationRelationProjection = joinDriverAndInformationRelationProjection;
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
    'information.date_time_registry',
    'driver.driver_id'
];
exports.joinDriverAndInformationProjection = joinDriverAndInformationProjection;
