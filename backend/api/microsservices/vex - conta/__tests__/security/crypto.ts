import { cipher, decipher } from "../../security/cryptography/crypto";
import { cryptograph } from "../../security/cryptography/bcrypt";
import knex from "../../repositories/knex/knex";
import OrgService from "../../services/org/orgService";
import { orgProjection } from "../../repositories/projections/OrgProjection";
import DriverService from "../../services/driver/driverService";
import { driverProjection } from "../../repositories/projections/driverProjection";

// salvar dados cifrados
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

// obter dados decifrados
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

export async function decipherOrgDataByIdAndGet(id: number | string) {
  const data = await knex
    .where("org_id", id)
    .select(orgProjection)
    .from("vex_schema.org");

  if (data.length === 0) return "org not found";

  data[0].fantasy_name = decipher(data[0].fantasy_name);
  data[0].corporate_name = decipher(data[0].corporate_name);
  data[0].cnpj = decipher(data[0].cnpj);
  data[0].org_status = decipher(data[0].org_status);
  data[0].cnae_main_code = decipher(data[0].cnae_main_code);
  data[0].open_date = decipher(data[0].open_date);

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

export async function decipherDriverDataByIdAndGet(id: number | string) {
  const data = await knex
    .where("driver_id", id)
    .select(driverProjection)
    .from("vex_schema.driver");

  if (data.length === 0) return "driver not found";

  data[0].first_name = decipher(data[0].first_name);
  data[0].last_name = decipher(data[0].last_name);
  data[0].email = decipher(data[0].email);

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

//atualizar dados cifrados
export async function cipherOrgDataAndUpdate(id: string | number, data: any) {
  const verifyId = new OrgService();

  const orgIdExistsOnDb = await verifyId.verifyId(id);

  if (orgIdExistsOnDb === false) return "organization not found";

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

  await orgService.update(id);

  if (orgIdExistsOnDb === true)
    return "organization updated and crypted with success";
}

export async function cipherDriverDataAndUpdate(id: string, data: any) {
  const verifyId = new DriverService();

  const orgIdExistsOnDb = await verifyId.verifyId(id);

  if (orgIdExistsOnDb === false) return "driver not found";

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

  await driverService.update(id);

  if (orgIdExistsOnDb === true)
    return "driver updated and crypted with success";
}

//verificação de existência no database
export async function verifyDeciphedCnpj(cnpj: any) {
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

  if (!search) return false;

  return true;
}

export async function verifyDeciphedEmail(email: any) {
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

  if (!search) return false;

  return true;
}

//deletar dados cifrados
export async function deleteAllCiphedOrg() {
  const data = await knex.select(orgProjection).from("vex_schema.org");

  if (data.length === 0) return "no data";

  await knex.delete().from("vex_schema.org");
}

export async function deleteByIdCiphedOrg(id: string | number) {
  const data = await knex
    .where("org_id", id)
    .select(orgProjection)
    .from("vex_schema.org");

  if (data.length === 0) return "organization not found";

  await knex.where("org_id", id).delete().from("vex_schema.org");
}

export async function deleteAllCiphedDriver() {
  const data = await knex.select(driverProjection).from("vex_schema.driver");

  if (data.length === 0) return "no data";

  await knex.delete().from("vex_schema.driver");
}

export async function deleteByIdCiphedDriver(id: string | number) {
  const data = await knex
    .where("driver_id", id)
    .select(driverProjection)
    .from("vex_schema.driver");

  if (data.length === 0) return "driver not found";

  await knex.where("driver_id", id).delete().from("vex_schema.driver");
}
