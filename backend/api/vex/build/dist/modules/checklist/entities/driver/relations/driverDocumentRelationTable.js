"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DriverDocumentRelationTable {
    constructor(driver_document_relation_id, driver_relation_id, org_relation_id) {
        this.driver_document_relation_id = driver_document_relation_id;
        (this.driver_relation_id = driver_relation_id),
            (this.org_relation_id = org_relation_id);
    }
}
exports.default = DriverDocumentRelationTable;
