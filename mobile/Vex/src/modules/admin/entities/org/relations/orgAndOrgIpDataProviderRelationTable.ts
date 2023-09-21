export default class OrgAndOrgIpDataProviderRelationTable {
  org_ip_data_provider_relation_id?: number;
  org_relation_id?: number;

  constructor(org_ip_data_provider_relation_id?: number, org_relation_id?: number) {
    this.org_ip_data_provider_relation_id = org_ip_data_provider_relation_id;
    this.org_relation_id = org_relation_id;
  }
}
