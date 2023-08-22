import Cryptography from "../../config/security/cryptography";
import knex from "../../repositories/knex/knex";
import { informationProjection } from "../../repositories/projections/informationProjection";
import { driverProjection } from "../../repositories/projections/driverProjection";
import calculatePage from "./paginate.calculate";


const cryptography = new Cryptography()

export async function getAllDriver(page?: any, size?: any) {

  page = calculatePage(page, size)

  const data = await knex
      .select(driverProjection)
      .from("vex_schema.driver")
      .offset(page)
      .limit(size)

  if (data.length === 0) return "no data";

  for (let cipherDataPosition in data) {
      data[cipherDataPosition].first_name = cryptography.decrypt(
        data[cipherDataPosition].first_name
      );
      data[cipherDataPosition].last_name = cryptography.decrypt(
        data[cipherDataPosition].last_name
      );
      data[cipherDataPosition].email = cryptography.decrypt(
        data[cipherDataPosition].email
      );
    }

    return data;
}


