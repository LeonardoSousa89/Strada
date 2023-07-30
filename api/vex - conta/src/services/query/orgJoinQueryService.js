"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const orgProjection_1 = require("../../repositories/projections/orgProjection");
const driverProjection_1 = require("../../repositories/projections/driverProjection");
const joinProjection_1 = require("../../repositories/projections/joinProjection");
class OrgJoinQuery {
    constructor() { }
    save() { }
    update() { }
    getAll() { }
    getById(org_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const organization = yield knex_1.default.select(orgProjection_1.orgProjection)
                .from('vex_schema.org')
                .where('org.org_id', org_id);
            const orgAndAddress = yield knex_1.default.select(orgProjection_1.orgAddressProjection)
                .from('vex_schema.org_address_relation_table')
                .innerJoin('vex_schema.org', 'org_address_relation_table.org_relation_id', 'org.org_id')
                .innerJoin('vex_schema.org_address', 'org_address_relation_table.org_address_relation_id', 'org_address.org_address_id')
                .where('org.org_id', org_id);
            const orgAndContact = yield knex_1.default.select(orgProjection_1.orgContactProjection)
                .from('vex_schema.org_contact_relation_table')
                .innerJoin('vex_schema.org', 'org_contact_relation_table.org_relation_id', 'org.org_id')
                .innerJoin('vex_schema.org_contact', 'org_contact_relation_table.org_contact_relation_id', 'org_contact.org_contact_id')
                .where('org.org_id', org_id);
            const employees = yield knex_1.default.select(driverProjection_1.driverProjection)
                .from('vex_schema.org_driver_relation_table')
                .innerJoin('vex_schema.org', 'org_driver_relation_table.org_relation_id', 'org.org_id')
                .innerJoin('vex_schema.driver', 'org_driver_relation_table.driver_relation_id', 'driver.driver_id')
                .where('org.org_id', org_id);
            const orgAndDriverAndAddress = yield knex_1.default.select(joinProjection_1.joinDriverAndAddressProjection)
                .from('vex_schema.driver_address_relation_table')
                .innerJoin('vex_schema.driver', 'driver_address_relation_table.driver_relation_id', 'driver.driver_id')
                .innerJoin('vex_schema.driver_address', 'driver_address_relation_table.driver_address_relation_id', 'driver_address.driver_address_id')
                .innerJoin('vex_schema.org', 'driver_address_relation_table.org_relation_id', 'org.org_id')
                .where('org.org_id', org_id);
            const orgAndDriverAndContact = yield knex_1.default.select(joinProjection_1.joinDriverAndContactProjection)
                .from('vex_schema.driver_contact_relation_table')
                .innerJoin('vex_schema.driver', 'driver_contact_relation_table.driver_relation_id', 'driver.driver_id')
                .innerJoin('vex_schema.driver_contact', 'driver_contact_relation_table.driver_contact_relation_id', 'driver_contact.driver_contact_id')
                .innerJoin('vex_schema.org', 'driver_contact_relation_table.org_relation_id', 'org.org_id')
                .where('org.org_id', org_id);
            const orgAndDriverAndDocument = yield knex_1.default.select(joinProjection_1.joinDriverAndDocumentProjection)
                .from('vex_schema.driver_document_relation_table')
                .innerJoin('vex_schema.driver', 'driver_document_relation_table.driver_relation_id', 'driver.driver_id')
                .innerJoin('vex_schema.driver_document', 'driver_document_relation_table.driver_document_relation_id', 'driver_document.driver_document_id')
                .innerJoin('vex_schema.org', 'driver_document_relation_table.org_relation_id', 'org.org_id')
                .where('org.org_id', org_id);
            const orgAndDriverAndInformation = yield knex_1.default.select(joinProjection_1.joinDriverAndInformationProjection)
                .from('vex_schema.driver_information_relation_table')
                .innerJoin('vex_schema.driver', 'driver_information_relation_table.driver_relation_id', 'driver.driver_id')
                .innerJoin('vex_schema.information', 'driver_information_relation_table.information_relation_id', 'information.information_id')
                .innerJoin('vex_schema.org', 'driver_information_relation_table.org_relation_id', 'org.org_id')
                .where('org.org_id', org_id);
            return {
                data: {
                    organization,
                    address: orgAndAddress,
                    contact: orgAndContact,
                    drivers: {
                        employees,
                        address: orgAndDriverAndAddress,
                        contact: orgAndDriverAndContact,
                        document: orgAndDriverAndDocument,
                        information: orgAndDriverAndInformation
                    }
                }
            };
        });
    }
    deleteAll() { }
    deleteById() { }
}
exports.default = OrgJoinQuery;
