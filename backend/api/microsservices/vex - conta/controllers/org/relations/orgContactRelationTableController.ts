import express from "express";
import OrgContactRelationTableService from "../../../services/org/relations/orgContactRelationTableService";
import HandleError from "../../../interface/error/handleError";
import OrgService from "../../../services/org/orgService";
import OrgContactService from "../../../services/org/orgContactService";

const orgContactRelationTableController = express.Router();

const err = new HandleError();

orgContactRelationTableController
  .route("/org/contact/relation-table/save")
  .post(async (req, res) => {
    const Org = { ...req.body };

    try {
      err.exceptionFieldNullOrUndefined(
        Org.org_contact_relation_id,
        "org contact id is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        Org.org_relation_id,
        "org id is undefined or null"
      );

      err.exceptionFieldIsEqualZero(
        Org.org_contact_relation_id,
        "org contact id code can not be 0"
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

    const verifyOrgContactIdExixts = await new OrgContactService().verifyId(
      Org.org_contact_relation_id
    );

    if (verifyOrgContactIdExixts == false)
      return res.status(404).json({
        error: "organization contact id not found",
      });

    const verifyRelationshipExists =
      await new OrgContactRelationTableService().verifyRelationshipExists(
        Org.org_contact_relation_id
      );

    if (verifyRelationshipExists == true)
      return res.status(400).json({
        error: "relationship already exists",
      });

    try {
      const response = new OrgContactRelationTableService(
        Org.org_contact_relation_id,
        Org.org_relation_id
      );

      await response.save();

      return res.status(201).json({
        msg: "organization contact relation saved",
      });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgContactRelationTableController
  .route("/org/contact/relation-table/get-all")
  .get(async (req, res) => {
    const orgContactRelationTableService = new OrgContactRelationTableService();

    try {
      const data = await orgContactRelationTableService.getAll();

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

orgContactRelationTableController
  .route("/org/contact/relation-table/get/by/id/:id")
  .get(async (req, res) => {
    const Org = { ...req.params };

    const orgContactRelationTableService = new OrgContactRelationTableService();

    try {
      const data = await orgContactRelationTableService.getById(Org.id);

      if (data.length === 0)
        return res.status(404).json({
          error: "no data relationship founded by id sended",
        });

      return res.status(200).json(data);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgContactRelationTableController
  .route("/org/contact/relation-table/delete/all")
  .delete(async (req, res) => {
    const orgContactRelationTableService = new OrgContactRelationTableService();

    try {
      const orgContactRelationExistsOrNotExists =
        await orgContactRelationTableService.getAll();

      if (orgContactRelationExistsOrNotExists.length === 0)
        return res.status(404).json({
          error: "no data relationship",
        });

      await orgContactRelationTableService.deleteAll();

      return res.status(204).json();
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgContactRelationTableController
  .route("/org/contact/relation-table/delete/by/id/:id")
  .delete(async (req, res) => {
    const Driver = { ...req.params };

    const orgContactRelationTableService = new OrgContactRelationTableService();

    try {
      const orgContactRelationExistsOrNotExists =
        await orgContactRelationTableService.verifyId(Number(Driver.id));

      if (orgContactRelationExistsOrNotExists === false)
        return res.status(404).json({
          error: "no data relationship founded by id sended",
        });

      await orgContactRelationTableService.deleteById(Driver.id);

      return res.status(204).json();
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

export { orgContactRelationTableController };
