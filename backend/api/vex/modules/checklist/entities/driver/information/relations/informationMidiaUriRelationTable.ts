export default class InformationMidiaUriRelationTable {
  midia_uri_relation_id?: number;
  information_relation_id?: number;
  driver_relation_id?: number;
  org_relation_id?: number;

  constructor(
    midia_uri_relation_id?: number,
    information_relation_id?: number,
    driver_relation_id?: number,
    org_relation_id?: number
  ) {
    this.midia_uri_relation_id = midia_uri_relation_id;
    this.information_relation_id = information_relation_id;
    this.driver_relation_id = driver_relation_id;
    this.org_relation_id = org_relation_id;
  }
}
