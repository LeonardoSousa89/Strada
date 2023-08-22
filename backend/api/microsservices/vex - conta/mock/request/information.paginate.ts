
import Cryptography from "../../config/security/cryptography";
import knex from "../../repositories/knex/knex";
import { informationProjection } from "../../repositories/projections/informationProjection";
import calculatePage from "./paginate.calculate";

const cryptography = new Cryptography()

export async function getAllInformation(page?: any, size?: any) { 

  page = calculatePage(page, size)

  const data = await knex
      .select(informationProjection)
      .from("vex_schema.information")
      .offset(page)
      .limit(size)

  if (data.length === 0) return "no data";

  for (let cipherDataPosition in data) {
      data[cipherDataPosition].starting_km = cryptography.decrypt(
        data[cipherDataPosition].starting_km
      );
      data[cipherDataPosition].final_km = cryptography.decrypt(
        data[cipherDataPosition].final_km
      );
      data[cipherDataPosition].plate = cryptography.decrypt(
        data[cipherDataPosition].plate
      );
      data[cipherDataPosition].notes = cryptography.decrypt(
        data[cipherDataPosition].notes
      );
  }

    return data;
}

