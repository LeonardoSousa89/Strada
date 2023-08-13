export default class DriverDocumentRelationTable {
  driver_document_relation_id?: number;
  driver_relation_id?: number;
  org_relation_id?: number;

  constructor(
    driver_document_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number
  ) {
    this.driver_document_relation_id = driver_document_relation_id;
    (this.driver_relation_id = driver_relation_id),
      (this.org_relation_id = org_relation_id);
  }
}
