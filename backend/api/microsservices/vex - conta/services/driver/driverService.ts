import knex from "../../repositories/knex/knex";
import { DbOperations } from "../../interface/operations";
import Driver from "../../entities/driver/driver";

import { driverProjection } from "../../repositories/projections/driverProjection";

export default class DriverService extends Driver implements DbOperations {
  constructor(
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
  ) {
    super(first_name, last_name, email, password);
  }

  driver = new Driver(
    this.first_name,
    this.last_name,
    this.email,
    this.password
  );

  async verifyId(id: string) {
    const existsOrNotExistsId = await knex
      .where("driver_id", id)
      .from("vex_schema.driver")
      .first();

    if (existsOrNotExistsId) return true;

    if (!existsOrNotExistsId) return false;
  }

  async verifyEmail(email: string) {
    const existsOrNotExistsEmail = await knex
      .where("email", email)
      .from("vex_schema.driver")
      .first();

    if (existsOrNotExistsEmail) return true;

    if (!existsOrNotExistsEmail) return false;
  }

  async save() {
    await knex.insert(this.driver).from("vex_schema.driver");
  }

  async update(id?: string | number) {
    await knex
      .where("driver_id", id)
      .update(this.driver)
      .from("vex_schema.driver");
  }

  async getAll() {
    const data = await knex.select(driverProjection).from("vex_schema.driver");

    return data;
  }

  async getById(id?: string | number) {
    const data = await knex
      .where("driver_id", id)
      .select(driverProjection)
      .from("vex_schema.driver");

    return data;
  }

  async deleteAll() {
    await knex.delete().from("vex_schema.driver");
  }

  async deleteById(id?: string | number) {
    await knex.where("driver_id", id).delete().from("vex_schema.driver");
  }
}
