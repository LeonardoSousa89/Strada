import { ApiOperations } from "../../../../interface/operations/operations";
import { driver } from "../../../../interface/types/driver/driver";
import { driverAddress } from "../../../../interface/types/driver/driverAddress";
import { driverContact } from "../../../../interface/types/driver/driverContact";
import { driverDocument } from "../../../../interface/types/driver/driverDocument";
import Http from "../../../comunication/services/web/rest/rest";

//mock
const orgId = 316;

export default class Rest implements ApiOperations {
  constructor(private data?: any) {}

  async save() {
    if (!this.data) return "verifique os campos obrigatórios";

    if (
      this.validatePassword(this.data.password, this.data.confirmPassword) ===
      "senhas não conferem"
    )
      throw "senhas não conferem";

    try {
      const Driver: driver = {
        first_name: this.data.firstName,
        last_name: this.data.lastName,
        email: this.data.email,
        password: this.data.password,
      };

      const DriverAddress: driverAddress = {
        zip_code: this.data.zipCode,
        state: this.data.state,
        city: this.data.city,
      };

      const DriverContact: driverContact = {
        telephone: this.data.telephone,
      };

      const DriverDocument: driverDocument = {
        cnh: this.data.cnh,
      };

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/save`,
        Driver
      );

      let driverCreated = await new Http().Get(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/get-all`
      );

      driverCreated =
        driverCreated.data.data[driverCreated.data.data.length - 1].driver_id;

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/relation-table/save`,
        {
          driver_relation_id: driverCreated,
          org_relation_id: orgId,
        }
      );

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/address/save`,
        DriverAddress
      );

      let driverAddressCreated = await new Http().Get(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/address/get-all`
      );

      driverAddressCreated =
        driverAddressCreated.data.data[
          driverAddressCreated.data.data.length - 1
        ].driver_address_id;

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/address/relation-table/save`,
        {
          driver_address_relation_id: driverAddressCreated,
          driver_relation_id: driverCreated,
          org_relation_id: orgId,
        }
      );

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/contact/save`,
        DriverContact
      );

      let driverContactCreated = await new Http().Get(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/contact/get-all`
      );

      driverContactCreated =
        driverContactCreated.data.data[
          driverContactCreated.data.data.length - 1
        ].driver_contact_id;

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/contact/relation-table/save`,
        {
          driver_contact_relation_id: driverContactCreated,
          driver_relation_id: driverCreated,
          org_relation_id: orgId,
        }
      );

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/document/save`,
        DriverDocument
      );

      let driverDocumentCreated = await new Http().Get(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/document/get-all`
      );

      driverDocumentCreated =
        driverDocumentCreated.data.data[
          driverDocumentCreated.data.data.length - 1
        ].driver_document_id;

      await new Http().Post(
        `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/document/relation-table/save`,
        {
          driver_document_relation_id: driverDocumentCreated,
          driver_relation_id: driverCreated,
          org_relation_id: orgId,
        }
      );

      return "motorista cadastrado com sucesso";
    } catch (e) {
      return "verifique os campos em branco ou se o motorista já está cadastrados";
    }
  }
  async update() {}
  async getAll() {}
  async getById(ZipCode?: any) {
    if (!ZipCode) return "cep inválido";

    const response = await new Http().Get(
      `${process.env.EXPO_PUBLIC_VEX_API}/org/driver/address/search/zip-code?ZipCode=${ZipCode}`
    );
    return response;
  }
  async deleteAll() {}
  async deleteById() {}

  //responsabilidade de errors
  validatePassword(password: any, confirmPassword: any) {
    if (password !== confirmPassword) return "senhas não conferem";
  }
}
