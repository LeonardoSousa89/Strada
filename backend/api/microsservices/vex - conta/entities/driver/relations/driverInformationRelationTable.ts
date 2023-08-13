export default class DriverInformationRelationTable {
  driver_relation_id?: number;
  information_relation_id?: number;
  org_relation_id?: number;

  constructor(
    driver_relation_id?: number,
    information_relation_id?: number,
    org_relation_id?: number
  ) {
    (this.driver_relation_id = driver_relation_id),
      (this.information_relation_id = information_relation_id);
    this.org_relation_id = org_relation_id;
  }
}
