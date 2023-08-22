import Cryptography from "../../config/security/cryptography";
import OrgIpDataProvider from "../../entities/org/orgIpDataProvider";
import { DbOperations } from "../../interface/operations";
import knex from "../../repositories/knex/knex";
import calculatePage from "../../repositories/paginate";

import { orgIpDataProviderProjection } from "../../repositories/projections/OrgProjection";

export default class OrgIpDataProviderService
  extends OrgIpDataProvider
  implements DbOperations
{
  constructor(
    ip?: string,
    hostname?: string,
    city?: string,
    region?: string,
    country?: string,
    loc?: string,
    org?: string,
    postal?: string,
    timezone?: string,
    readme?: string
  ) {
    super(
      ip,
      hostname,
      city,
      region,
      country,
      loc,
      org,
      postal,
      timezone,
      readme
    );
  }

  orgIpDataProvider = new OrgIpDataProvider(
    this.ip,
    this.hostname,
    this.city,
    this.region,
    this.country,
    this.loc,
    this.org,
    this.postal,
    this.timezone,
    this.readme
  );

  cryptography = new Cryptography();

  async verifyId(id: string | number) {
    const existsOrNotExistsId = await knex
      .where("org_ip_data_provider_id", id)
      .from("vex_schema.org_ip_data_provider")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async save() {
    await knex
      .insert(this.orgIpDataProvider)
      .from("vex_schema.org_ip_data_provider");
  }

  async update(id?: number | string) {
    await knex
      .where("org_ip_data_provider_id", id)
      .update(this.orgIpDataProvider)
      .from("vex_schema.org_ip_data_provider");
  }

  async getAll(page?: any, size?: any) {
    page = calculatePage(page, size);

    const data = await knex
      .select(orgIpDataProviderProjection)
      .from("vex_schema.org_ip_data_provider")
      .offset(page)
      .limit(size);

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].public_client_ip = this.cryptography.decrypt(
        data[cipherDataPosition].public_client_ip
      );
      data[cipherDataPosition].hostname = this.cryptography.decrypt(
        data[cipherDataPosition].hostname
      );
      data[cipherDataPosition].city = this.cryptography.decrypt(
        data[cipherDataPosition].city
      );
      data[cipherDataPosition].region = this.cryptography.decrypt(
        data[cipherDataPosition].region
      );
      data[cipherDataPosition].country = this.cryptography.decrypt(
        data[cipherDataPosition].country
      );
      data[cipherDataPosition].loc = this.cryptography.decrypt(
        data[cipherDataPosition].loc
      );
      data[cipherDataPosition].provider = this.cryptography.decrypt(
        data[cipherDataPosition].provider
      );
      data[cipherDataPosition].postal = this.cryptography.decrypt(
        data[cipherDataPosition].postal
      );
      data[cipherDataPosition].timezone = this.cryptography.decrypt(
        data[cipherDataPosition].timezone
      );
      data[cipherDataPosition].readme = this.cryptography.decrypt(
        data[cipherDataPosition].readme
      );
    }

    return data;
  }

  async getById(id?: number | string) {
    const data = await knex
      .where("org_ip_data_provider_id", id)
      .select(orgIpDataProviderProjection)
      .from("vex_schema.org_ip_data_provider");

    if (data.length === 0) return "org not found";

    data[0].public_client_ip = this.cryptography.decrypt(data[0].public_client_ip);
    data[0].hostname = this.cryptography.decrypt(data[0].hostname);
    data[0].city = this.cryptography.decrypt(data[0].city);
    data[0].region = this.cryptography.decrypt(data[0].region);
    data[0].country = this.cryptography.decrypt(data[0].country);
    data[0].loc = this.cryptography.decrypt(data[0].loc);
    data[0].provider = this.cryptography.decrypt(data[0].provider);
    data[0].postal = this.cryptography.decrypt(data[0].postal);
    data[0].timezone = this.cryptography.decrypt(data[0].timezone);
    data[0].readme = this.cryptography.decrypt(data[0].readme);

    return data;
  }

  async deleteAll() {}

  async deleteById(id?: number | string) {
    await knex
      .where("org_ip_data_provider_id", id)
      .delete()
      .from("vex_schema.org_ip_data_provider");
  }
}
