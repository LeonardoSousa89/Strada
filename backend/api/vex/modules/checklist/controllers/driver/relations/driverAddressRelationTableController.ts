import DriverAddressRelationTableService from "../../../services/driver/relations/driveAddressRelationTableService";
import HandleError from "../../../../../interface/error/handleError";
import DriverService from "../../../services/driver/driverService";
import DriverAddressService from "../../../services/driver/driverAddressService";
import OrgService from "../../../../admin/services/org/orgService";

const err = new HandleError();

export const saveDriverAddressRelationTable = async (req: any, res: any) => {
  const Driver = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.driver_address_relation_id,
      "driver address id is undefined or null"
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
      Driver.driver_address_relation_id,
      "driver address id code can not be 0"
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

  const verifyDriverAddressIdExixts = await new DriverAddressService().verifyId(
    Driver.driver_address_relation_id
  );

  if (verifyDriverAddressIdExixts == false)
    return res.status(404).json({
      error: "driver address id not found",
    });

  const verifyOrgIdExixts = await new OrgService().verifyId(
    Driver.org_relation_id
  );

  if (verifyOrgIdExixts == false)
    return res.status(404).json({
      error: "org id not found",
    });

  const verifyRelationshipExists =
    await new DriverAddressRelationTableService().verifyRelationshipExists(
      Driver.driver_address_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(400).json({
      error: "relationship already exists",
    });

  try {
    const driverAndAddressRelation = new DriverAddressRelationTableService(
      Driver.driver_address_relation_id,
      Driver.driver_relation_id,
      Driver.org_relation_id
    );

    await driverAndAddressRelation.save();

    return res.status(201).json({
      msg: "driver address relation saved",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getDriverAddressRelationTable = async (req: any, res: any) => {
  const driverAndAddressRelation = new DriverAddressRelationTableService();

  try {
    const data = await driverAndAddressRelation.getAll();

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

export const getDriverAddressRelationTableById = async (req: any, res: any) => {
  const Driver = { ...req.params };

  const driverAndAddressRelation = new DriverAddressRelationTableService();

  try {
    const data = await driverAndAddressRelation.getById(Driver.id);

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

export const deleteAllDriverAddressRelationTable = async (
  req: any,
  res: any
) => {
  const driverAndAddressRelation = new DriverAddressRelationTableService();

  try {
    const driverAddressRelationExistsOrNotExists =
      await driverAndAddressRelation.getAll();

    if (driverAddressRelationExistsOrNotExists.length === 0)
      return res.status(404).json({
        error: "no data relationship",
      });

    await driverAndAddressRelation.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteDriverAddressRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const driverAndAddressRelation = new DriverAddressRelationTableService();

  try {
    const driverAddressRelationExistsOrNotExists =
      await driverAndAddressRelation.verifyId(Number(Driver.id));

    if (driverAddressRelationExistsOrNotExists === false)
      return res.status(404).json({
        error: "no data relationship founded by id sended",
      });

    await driverAndAddressRelation.deleteById(Driver.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
