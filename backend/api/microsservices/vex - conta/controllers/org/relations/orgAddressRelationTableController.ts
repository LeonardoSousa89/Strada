import express from "express";
import OrgAddressRelationTableService from "../../../services/org/relations/orgAddressRelationTableService";
import HandleError from "../../../interface/error/handleError";
import OrgService from "../../../services/org/orgService";
import OrgAddressService from "../../../services/org/orgAddressService";

const orgAddressRelationTableController = express.Router();

const err = new HandleError();

orgAddressRelationTableController
  .route("/org/address/relation-table/save")
  .post(async (req, res) => {
    const Org = { ...req.body };

    try {
      err.exceptionFieldNullOrUndefined(
        Org.org_address_relation_id,
        "org address id is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        Org.org_relation_id,
        "org id is undefined or null"
      );

      err.exceptionFieldIsEqualZero(
        Org.org_address_relation_id,
        "org address id code can not be 0"
      );
      err.exceptionFieldIsEqualZero(Org.org_relation_id, "org id can not be 0");
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    const verifyOrgIdExixts = await new OrgService().verifyId(
      Org.org_relation_id
    );

    if (verifyOrgIdExixts == false)
      return res.status(404).json({
        error: "organization id not found",
      });

    const verifyOrgAddressIdExixts = await new OrgAddressService().verifyId(
      Org.org_address_relation_id
    );

    if (verifyOrgAddressIdExixts == false)
      return res.status(404).json({
        error: "organization address id not found",
      });

    const verifyRelationshipExists =
      await new OrgAddressRelationTableService().verifyRelationshipExists(
        Org.org_address_relation_id
      );

    if (verifyRelationshipExists == true)
      return res.status(400).json({
        error: "relationship already exists",
      });

    try {
      const orgAddressRelationTableService = new OrgAddressRelationTableService(
        Org.org_address_relation_id,
        Org.org_relation_id
      );

      await orgAddressRelationTableService.save();

      return res.status(201).json({
        msg: "organization address relation saved",
      });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgAddressRelationTableController
  .route("/org/address/relation-table/get-all")
  .get(async (req, res) => {
    const orgAddressRelationTableService = new OrgAddressRelationTableService();

    try {
      const data = await orgAddressRelationTableService.getAll();

      if (data.length === 0)
        return res.status(404).json({
          error: "no data relationship",
        });

      return res.status(200).json(data);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

export { orgAddressRelationTableController };
