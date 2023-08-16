import knex from "../../../repositories/knex/knex";
import { DbOperations } from "../../../interface/operations";
import Information from "../../../entities/driver/information/information";

import { informationProjection } from "../../../repositories/projections/informationProjection";
import DriverInformationRelationTableService from "../relations/driverInformationRelationTableService";
import Cryptography from "../../../config/security/cryptography";

export default class InformationService
  extends Information
  implements DbOperations
{
  //inserir o campo de midia uri
  constructor(
    starting_km?: string,
    final_km?: string,
    plate?: string,
    notes?: string,
    date_time_registry?: string
  ) {
    super(starting_km, final_km, plate, notes, date_time_registry);
  }

  information = new Information(
    this.starting_km,
    this.final_km,
    this.plate,
    this.notes,
    this.date_time_registry
  );

  cryptography = new Cryptography();

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("information_id", id)
      .from("vex_schema.information")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  verifyInformation(starting_km: string, final_km: string) {
    if (starting_km === null && final_km === null) return false;

    if (starting_km === "" && final_km === "") return false;

    if (starting_km === null && final_km === "") return false;

    if (starting_km === "" && final_km === null) return false;
  }

  getTime() {
    const southAmericaTimeZone = new Date();

    const date = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "long",
    }).format(southAmericaTimeZone);

    const time = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      timeStyle: "short",
    }).format(southAmericaTimeZone);

    return `${date}, ${time}`;
  }

  async save() {
    await knex.insert(this.information).from("vex_schema.information");
  }

  async update(id?: string | number) {
    await knex
      .where("information_id", id)
      .update(this.information)
      .from("vex_schema.information");
  }

  async getAll() {
    const data = await knex
      .select(informationProjection)
      .from("vex_schema.information");

    if (data.length === 0) return "no data";

    for (let cipherDataPosition in data) {
      data[cipherDataPosition].starting_km = this.cryptography.decrypt(
        data[cipherDataPosition].starting_km
      );
      data[cipherDataPosition].final_km = this.cryptography.decrypt(
        data[cipherDataPosition].final_km
      );
      data[cipherDataPosition].plate = this.cryptography.decrypt(
        data[cipherDataPosition].plate
      );
      data[cipherDataPosition].notes = this.cryptography.decrypt(
        data[cipherDataPosition].notes
      );
    }

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("information_id", id)
      .select(informationProjection)
      .from("vex_schema.information");

    if (data.length === 0) return "information not found";

    data[0].starting_km = this.cryptography.decrypt(data[0].starting_km);
    data[0].final_km = this.cryptography.decrypt(data[0].final_km);
    data[0].plate = this.cryptography.decrypt(data[0].plate);
    data[0].notes = this.cryptography.decrypt(data[0].notes);

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.information");
  }

  async deleteById(id?: string | number) {
    await knex
      .where("information_id", id)
      .delete()
      .from("vex_schema.information");
  }
}
