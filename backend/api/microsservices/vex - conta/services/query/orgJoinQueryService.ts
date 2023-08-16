import knex from "../../repositories/knex/knex";

import {
  orgProjection,
  orgAddressProjection,
  orgContactProjection,
} from "../../repositories/projections/OrgProjection";

import { driverProjection } from "../../repositories/projections/driverProjection";

import {
  joinDriverAndAddressProjection,
  joinDriverAndContactProjection,
  joinDriverAndDocumentProjection,
  joinDriverAndInformationProjection,
} from "../../repositories/projections/joinProjection";

import { DbOperations } from "../../interface/operations";

export default class OrgJoinQuery implements DbOperations {
  constructor() {}

  save() {}

  update() {}

  getAll() {}

  async getById(org_id?: number) {
    const organization = await knex
      .select(orgProjection)
      .from("vex_schema.org")
      .where("org.org_id", org_id);

    const orgAndAddress = await knex
      .select(orgAddressProjection)
      .from("vex_schema.org_address_relation_table")
      .innerJoin(
        "vex_schema.org",
        "org_address_relation_table.org_relation_id",
        "org.org_id"
      )
      .innerJoin(
        "vex_schema.org_address",
        "org_address_relation_table.org_address_relation_id",
        "org_address.org_address_id"
      )
      .where("org.org_id", org_id);

    const orgAndContact = await knex
      .select(orgContactProjection)
      .from("vex_schema.org_contact_relation_table")
      .innerJoin(
        "vex_schema.org",
        "org_contact_relation_table.org_relation_id",
        "org.org_id"
      )
      .innerJoin(
        "vex_schema.org_contact",
        "org_contact_relation_table.org_contact_relation_id",
        "org_contact.org_contact_id"
      )
      .where("org.org_id", org_id);

    const employees = await knex
      .select(driverProjection)
      .from("vex_schema.org_driver_relation_table")
      .innerJoin(
        "vex_schema.org",
        "org_driver_relation_table.org_relation_id",
        "org.org_id"
      )
      .innerJoin(
        "vex_schema.driver",
        "org_driver_relation_table.driver_relation_id",
        "driver.driver_id"
      )
      .where("org.org_id", org_id);

    const orgAndDriverAndAddress = await knex
      .select(joinDriverAndAddressProjection)
      .from("vex_schema.driver_address_relation_table")
      .innerJoin(
        "vex_schema.driver",
        "driver_address_relation_table.driver_relation_id",
        "driver.driver_id"
      )
      .innerJoin(
        "vex_schema.driver_address",
        "driver_address_relation_table.driver_address_relation_id",
        "driver_address.driver_address_id"
      )
      .innerJoin(
        "vex_schema.org",
        "driver_address_relation_table.org_relation_id",
        "org.org_id"
      )
      .where("org.org_id", org_id);

    const orgAndDriverAndContact = await knex
      .select(joinDriverAndContactProjection)
      .from("vex_schema.driver_contact_relation_table")
      .innerJoin(
        "vex_schema.driver",
        "driver_contact_relation_table.driver_relation_id",
        "driver.driver_id"
      )
      .innerJoin(
        "vex_schema.driver_contact",
        "driver_contact_relation_table.driver_contact_relation_id",
        "driver_contact.driver_contact_id"
      )
      .innerJoin(
        "vex_schema.org",
        "driver_contact_relation_table.org_relation_id",
        "org.org_id"
      )
      .where("org.org_id", org_id);

    const orgAndDriverAndDocument = await knex
      .select(joinDriverAndDocumentProjection)
      .from("vex_schema.driver_document_relation_table")
      .innerJoin(
        "vex_schema.driver",
        "driver_document_relation_table.driver_relation_id",
        "driver.driver_id"
      )
      .innerJoin(
        "vex_schema.driver_document",
        "driver_document_relation_table.driver_document_relation_id",
        "driver_document.driver_document_id"
      )
      .innerJoin(
        "vex_schema.org",
        "driver_document_relation_table.org_relation_id",
        "org.org_id"
      )
      .where("org.org_id", org_id);

    const orgAndDriverAndInformation = await knex
      .select(joinDriverAndInformationProjection)
      .from("vex_schema.driver_information_relation_table")
      .innerJoin(
        "vex_schema.driver",
        "driver_information_relation_table.driver_relation_id",
        "driver.driver_id"
      )
      .innerJoin(
        "vex_schema.information",
        "driver_information_relation_table.information_relation_id",
        "information.information_id"
      )
      .innerJoin(
        "vex_schema.org",
        "driver_information_relation_table.org_relation_id",
        "org.org_id"
      )
      .where("org.org_id", org_id);

    return {
      data: {
        organization,
        address: orgAndAddress,
        contact: orgAndContact,
        drivers: {
          employees,
          address: orgAndDriverAndAddress,
          contact: orgAndDriverAndContact,
          document: orgAndDriverAndDocument,
          information: orgAndDriverAndInformation,
        },
      },
    };
  }

  deleteAll() {}

  deleteById() {}
}