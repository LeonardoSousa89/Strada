import driverInformationRelationTableService from "../../../services/driver/relations/driverInformationRelationTableService";
import HandleError from "../../../../../interface/error/handleError";
import DriverService from "../../../services/driver/driverService";
import InformationService from "../../../services/driver/information/informationService";
import OrgService from "../../../../admin/services/org/orgService";
import DriverInformationRelationTableService from "../../../services/driver/relations/driverInformationRelationTableService";

const err = new HandleError();

export const saveDriverInformationRelationTable = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.driver_relation_id,
      "driver id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.information_relation_id,
      "driver information id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.org_relation_id,
      "org id is undefined or null"
    );

    err.exceptionFieldIsEqualZero(
      Driver.driver_relation_id,
      "driver id can not be 0"
    );
    err.exceptionFieldIsEqualZero(
      Driver.information_relation_id,
      "driver information id can not be 0"
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
    await new DriverInformationRelationTableService().verifyRelationshipExists(
      Driver.information_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(400).json({
      error: "relationship already exists",
    });

  try {
    const driverAndInformationRelation =
      new driverInformationRelationTableService(
        Driver.driver_relation_id,
        Driver.information_relation_id,
        Driver.org_relation_id
      );

    await driverAndInformationRelation.save();

    return res.status(201).json({
      msg: "driver information relation save",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
export const getDriverInformationRelationTable = async (req: any, res: any) => {
  const driverAndInformationRelation =
    new driverInformationRelationTableService();

  try {
    const data = await driverAndInformationRelation.getAll();

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

export const getDriverInformationRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const driverAndInformationRelation =
    new driverInformationRelationTableService();

  try {
    const data = await driverAndInformationRelation.getById(Driver.id);

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

export const deleteAllDriverInformationRelationTable = async (
  req: any,
  res: any
) => {
  const driverAndInformationRelation =
    new driverInformationRelationTableService();

  try {
    const driverInfomationRelationExistsOrNotExists =
      await driverAndInformationRelation.getAll();

    if (driverInfomationRelationExistsOrNotExists.length === 0)
      return res.status(404).json({
        error: "no data relationship",
      });

    await driverAndInformationRelation.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteDriverInformationRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const driverAndInformationRelation =
    new driverInformationRelationTableService();

  try {
    const driverInfomationRelationExistsOrNotExists =
      await driverAndInformationRelation.verifyId(Number(Driver.id));

    if (driverInfomationRelationExistsOrNotExists === false)
      return res.status(404).json({
        error: "no data relationship founded by id sended",
      });

    await driverAndInformationRelation.deleteById(Driver.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
