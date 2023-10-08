"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DriveAddressRelationTable {
    constructor(driver_address_relation_id, driver_relation_id, org_relation_id) {
        this.driver_address_relation_id = driver_address_relation_id;
        (this.driver_relation_id = driver_relation_id),
            (this.org_relation_id = org_relation_id);
    }
}
exports.default = DriveAddressRelationTable;
