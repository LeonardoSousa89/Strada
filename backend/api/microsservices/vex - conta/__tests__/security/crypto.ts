import { cipher, decipher } from "../../security/cryptography/crypto";
import { cryptograph } from "../../security/cryptography/bcrypt";
import knex from "../../repositories/knex/knex";
import OrgService from "../../services/org/orgService";
import { orgProjection } from "../../repositories/projections/OrgProjection";
import DriverService from "../../services/driver/driverService";
import { driverProjection } from "../../repositories/projections/driverProjection";

export async function cipherOrgDataAndSave(data: any) {
  data.fantasy_name = cipher(data.fantasy_name);
  data.corporate_name = cipher(data.corporate_name);
  data.cnpj = cipher(data.cnpj);
  data.org_status = cipher(data.org_status);
  data.cnae_main_code = cipher(data.cnae_main_code);
  data.open_date = cipher(data.open_date);

  data.password = cryptograph(data.password);

  const orgService = new OrgService(
    data.fantasy_name,
    data.corporate_name,
    data.cnpj,
    data.org_status,
    data.cnae_main_code,
    data.open_date,
    data.password
  );

  await orgService.save();
}

export async function cipherDriverDataAndSave(data: any) {
  data.first_name = cipher(data.first_name);
  data.last_name = cipher(data.last_name);
  data.email = cipher(data.email);

  data.password = cryptograph(data.password);

  const driverService = new DriverService(
    data.first_name,
    data.last_name,
    data.email,
    data.password
  );

  await driverService.save();
}

export async function decipherOrgDataAndGet() {
  const data = await knex.select(orgProjection).from("vex_schema.org");

  for (let cipherDataPosition in data) {
    data[cipherDataPosition].fantasy_name = decipher(
      data[cipherDataPosition].fantasy_name
    );
    data[cipherDataPosition].corporate_name = decipher(
      data[cipherDataPosition].corporate_name
    );
    data[cipherDataPosition].cnpj = decipher(data[cipherDataPosition].cnpj);
    data[cipherDataPosition].org_status = decipher(
      data[cipherDataPosition].org_status
    );
    data[cipherDataPosition].cnae_main_code = decipher(
      data[cipherDataPosition].cnae_main_code
    );
    data[cipherDataPosition].open_date = decipher(
      data[cipherDataPosition].open_date
    );
  }

  return data;
}

export async function decipherDriverDataAndGet() {
  const data = await knex.select(driverProjection).from("vex_schema.driver");

  for (let cipherDataPosition in data) {
    data[cipherDataPosition].first_name = decipher(
      data[cipherDataPosition].first_name
    );
    data[cipherDataPosition].last_name = decipher(
      data[cipherDataPosition].last_name
    );
    data[cipherDataPosition].email = decipher(data[cipherDataPosition].email);
  }

  return data;
}

export async function verifyDeciphedCnpjAndGetData(cnpj: any) {
  const data = await knex.select(orgProjection).from("vex_schema.org");

  for (let cipherDataPosition in data) {
    data[cipherDataPosition].fantasy_name = decipher(
      data[cipherDataPosition].fantasy_name
    );
    data[cipherDataPosition].corporate_name = decipher(
      data[cipherDataPosition].corporate_name
    );
    data[cipherDataPosition].cnpj = decipher(data[cipherDataPosition].cnpj);
    data[cipherDataPosition].org_status = decipher(
      data[cipherDataPosition].org_status
    );
    data[cipherDataPosition].cnae_main_code = decipher(
      data[cipherDataPosition].cnae_main_code
    );
    data[cipherDataPosition].open_date = decipher(
      data[cipherDataPosition].open_date
    );
  }

  const search = data.find((dataElement) => dataElement.cnpj === cnpj);

  if (!search) return "cnpj not found";

  return search;
}

export async function verifyDeciphedEmailAndGetData(email: any) {
  const data = await knex.select(driverProjection).from("vex_schema.driver");

  for (let cipherDataPosition in data) {
    data[cipherDataPosition].first_name = decipher(
      data[cipherDataPosition].first_name
    );
    data[cipherDataPosition].last_name = decipher(
      data[cipherDataPosition].last_name
    );
    data[cipherDataPosition].email = decipher(data[cipherDataPosition].email);
  }

  const search = data.find((dataElement) => dataElement.email === email);

  if (!search) return "email not found";

  return search;
}

export async function verifyDeciphedDocumentAndGetData(cnh: any) {}
