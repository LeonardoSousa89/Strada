import express from "express";
import InformationMidiaUriRelationTableService from "../../../../services/driver/information/relations/informationMidiaUriRelationTableService";
import HandleError from "../../../../interface/error/handleError";
import DriverService from "../../../../services/driver/driverService";
import InformationService from "../../../../services/driver/information/informationService";
import OrgService from "../../../../services/org/orgService";

import MidiaService from "../../../../services/driver/information/midiaService";

const InformationMidiaUriRelationTableController = express.Router();

const err = new HandleError();

InformationMidiaUriRelationTableController.route(
  "/org/driver/information/midia/uri/relation-table/save"
).post(async (req, res) => {
  const Driver = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.midia_uri_relation_id,
      "driver information midia id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.information_relation_id,
      "driver information id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.driver_relation_id,
      "driver id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.org_relation_id,
      "org id is undefined or null"
    );

    err.exceptionFieldIsEqualZero(
      Driver.midia_uri_relation_id,
      "driver information midia id can not be 0"
    );
    err.exceptionFieldIsEqualZero(
      Driver.information_relation_id,
      "driver information id can not be 0"
    );
    err.exceptionFieldIsEqualZero(
      Driver.driver_relation_id,
      "driver id can not be 0"
    );
    err.exceptionFieldIsEqualZero(
      Driver.org_relation_id,
      "org id can not be 0"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const verifyInformationMidiaIdExixts = await new MidiaService().verifyId(
    Driver.midia_uri_relation_id
  );

  if (verifyInformationMidiaIdExixts == false)
    return res.status(404).json({
      error: "driver information midia id not found",
    });

  const verifyDriverIdExixts = await new DriverService().verifyId(
    Driver.driver_relation_id
  );

  if (verifyDriverIdExixts == false)
    return res.status(404).json({
      error: "driver id not found",
    });

  const verifyInformationIdExixts = await new InformationService().verifyId(
    Driver.information_relation_id
  );

  if (verifyInformationIdExixts == false)
    return res.status(404).json({
      error: "driver information id not found",
    });

  const verifyOrgIdExixts = await new OrgService().verifyId(
    Driver.org_relation_id
  );

  if (verifyOrgIdExixts == false)
    return res.status(404).json({
      error: "org id not found",
    });

  const verifyRelationshipExists =
    await new InformationMidiaUriRelationTableService().verifyRelationshipExists(
      Driver.midia_uri_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(400).json({
      error: "relationship already exists",
    });

  try {
    const InformationAndMidiaRelation =
      new InformationMidiaUriRelationTableService(
        Driver.midia_uri_relation_id,
        Driver.information_relation_id,
        Driver.driver_relation_id,
        Driver.org_relation_id
      );

    await InformationAndMidiaRelation.save();

    return res.status(201).json({
      msg: "information midia relation save",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

// pendente de testes
// InformationMidiaUriRelationTableController.route(
//   "/org/driver/information/midia/uri/relation-table/get-all"
// ).get(async (req, res) => {
//   const InformationAndMidiaRelation =
//     new InformationMidiaUriRelationTableService();

//   try {
//     const data = await InformationAndMidiaRelation.getAll();

//     if (data.length === 0)
//       return res.status(404).json({
//         error: "no data relationship",
//       });

//     return res.status(200).json(data);
//   } catch (__) {
//     return res.status(500).json({
//       error: "i am sorry, there is an error with server",
//     });
//   }
// });

// InformationMidiaUriRelationTableController.route(
//   "/org/driver/information/midia/uri/relation-table/get/by/id/:id"
// ).get(async (req, res) => {
//   const Driver = { ...req.params };

//   const InformationAndMidiaRelation =
//     new InformationMidiaUriRelationTableService();

//   try {
//     const data = await InformationAndMidiaRelation.getById(Driver.id);

//     if (data.length === 0)
//       return res.status(404).json({
//         error: "no data relationship founded by id sended",
//       });

//     return res.status(200).json(data);
//   } catch (__) {
//     return res.status(500).json({
//       error: "i am sorry, there is an error with server",
//     });
//   }
// });

// InformationMidiaUriRelationTableController.route(
//   "/org/driver/information/midia/uri/relation-table/delete/all"
// ).delete(async (req, res) => {
//   const InformationAndMidiaRelation =
//     new InformationMidiaUriRelationTableService();

//   try {
//     const driverInfomationRelationExistsOrNotExists =
//       await InformationAndMidiaRelation.getAll();

//     if (driverInfomationRelationExistsOrNotExists.length === 0)
//       return res.status(404).json({
//         error: "no data relationship",
//       });

//     await InformationAndMidiaRelation.deleteAll();

//     return res.status(204).json();
//   } catch (__) {
//     return res.status(500).json({
//       error: "i am sorry, there is an error with server",
//     });
//   }
// });

// InformationMidiaUriRelationTableController.route(
//   "/org/driver/information/midia/uri/relation-table/delete/by/id/:id"
// ).delete(async (req, res) => {
//   const Driver = { ...req.params };

//   const InformationAndMidiaRelation =
//     new InformationMidiaUriRelationTableService();

//   try {
//     const driverInfomationRelationExistsOrNotExists =
//       await InformationAndMidiaRelation.verifyId(Number(Driver.id));

//     if (driverInfomationRelationExistsOrNotExists === false)
//       return res.status(404).json({
//         error: "no data relationship founded by id sended",
//       });

//     await InformationAndMidiaRelation.deleteById(Driver.id);

//     return res.status(204).json();
//   } catch (__) {
//     return res.status(500).json({
//       error: "i am sorry, there is an error with server",
//     });
//   }
// });

export { InformationMidiaUriRelationTableController };
