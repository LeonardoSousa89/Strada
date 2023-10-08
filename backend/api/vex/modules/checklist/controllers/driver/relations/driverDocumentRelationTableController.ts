import DriverDocumentRelationTableService from "../../../services/driver/relations/driverDocumentRelationTableService";
import HandleError from "../../../../../interface/error/handleError";
import DriverService from "../../../services/driver/driverService";
import DriverDocumentService from "../../../services/driver/driverDocumentService";
import OrgService from "../../../../admin/services/org/orgService";

const err = new HandleError();

export const saveDriverDocumentRelationTable = async (req: any, res: any) => {
  const Driver = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.driver_document_relation_id,
      "driver document id is undefined or null"
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
      Driver.driver_document_relation_id,
      "driver document id code can not be 0"
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

  const verifyDriverIdExixts = await new DriverService().verifyId(
    Driver.driver_relation_id
  );

  if (verifyDriverIdExixts == false)
    return res.status(404).json({
      error: "driver id not found",
    });

  const verifyDriverDocumentIdExixts =
    await new DriverDocumentService().verifyId(
      Driver.driver_document_relation_id
    );

  if (verifyDriverDocumentIdExixts == false)
    return res.status(404).json({
      error: "driver document id not found",
    });

  const verifyOrgIdExixts = await new OrgService().verifyId(
    Driver.org_relation_id
  );

  if (verifyOrgIdExixts == false)
    return res.status(404).json({
      error: "org id not found",
    });

  const verifyRelationshipExists =
    await new DriverDocumentRelationTableService().verifyRelationshipExists(
      Driver.driver_document_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(400).json({
      error: "relationship already exists",
    });

  try {
    const driverAndDocumentRelation = new DriverDocumentRelationTableService(
      Driver.driver_document_relation_id,
      Driver.driver_relation_id,
      Driver.org_relation_id
    );

    await driverAndDocumentRelation.save();

    return res.status(201).json({
      msg: "driver document relation save",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getDriverDocumentRelationTable = async (req: any, res: any) => {
  const driverAndDocumentRelation = new DriverDocumentRelationTableService();

  try {
    const data = await driverAndDocumentRelation.getAll();

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
};

export const getDriverDocumentRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const driverAndDocumentRelation = new DriverDocumentRelationTableService();

  try {
    const data = await driverAndDocumentRelation.getById(Driver.id);

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
};

export const deleteAllDriverDocumentRelationTable = async (
  req: any,
  res: any
) => {
  const driverAndDocumentRelation = new DriverDocumentRelationTableService();

  try {
    const driverDocumentRelationExistsOrNotExists =
      await driverAndDocumentRelation.getAll();

    if (driverDocumentRelationExistsOrNotExists.length === 0)
      return res.status(404).json({
        error: "no data relationship",
      });

    await driverAndDocumentRelation.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteDriverDocumentRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const driverAndDocumentRelation = new DriverDocumentRelationTableService();

  try {
    const driverDocumentRelationExistsOrNotExists =
      await driverAndDocumentRelation.verifyId(Number(Driver.id));

    if (driverDocumentRelationExistsOrNotExists === false)
      return res.status(404).json({
        error: "no data relationship founded by id sended",
      });

    await driverAndDocumentRelation.deleteById(Driver.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
