import HandleError from "../../../../../interface/error/handleError";
import OrgService from "../../../services/org/orgService";
import DriverService from "../../../../checklist/services/driver/driverService";
import OrgDriverRelationTableService from "../../../services/org/relations/OrgDriverRelationTableService";

const err = new HandleError();

export const saveOrgDriverRelationTable = async (req: any, res: any) => {
  const Org = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Org.driver_relation_id,
      "org driver id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.org_relation_id,
      "org id is undefined or null"
    );

    err.exceptionFieldIsEqualZero(
      Org.driver_relation_id,
      "org driver id code can not be 0"
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

  const verifyOrgContactIdExixts = await new DriverService().verifyId(
    Org.driver_relation_id
  );

  if (verifyOrgContactIdExixts == false)
    return res.status(404).json({
      error: "organization driver id not found",
    });

  const verifyRelationshipExists =
    await new OrgDriverRelationTableService().verifyRelationshipExists(
      Org.driver_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(404).json({
      error: "relationship already exists",
    });

  try {
    const driverAndOrganizationRelationShip = new OrgDriverRelationTableService(
      Org.driver_relation_id,
      Org.org_relation_id
    );

    await driverAndOrganizationRelationShip.save();

    return res.status(201).json({
      msg: "organizaton driver relationship save",
    });
  } catch (e) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getOrgDriverRelationTable = async (req: any, res: any) => {
  const driver = new OrgDriverRelationTableService();

  try {
    const data = await driver.getAll();

    if (data.length === 0)
      return res.status(404).json({
        error: "no data relashionship",
      });

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getOrgDriverRelationTableById = async (req: any, res: any) => {
  const Org = { ...req.params };

  const orgDriverRelation = new OrgDriverRelationTableService();

  try {
    const data = await orgDriverRelation.getById(Org.id);

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

export const deleteOrgDriverRelationTable = async (req: any, res: any) => {
  const orgDriverRelation = new OrgDriverRelationTableService();

  try {
    const orgDriverRelationExistsOrNotExists = await orgDriverRelation.getAll();

    if (orgDriverRelationExistsOrNotExists.length === 0)
      return res.status(404).json({
        error: "no data relationship",
      });

    await orgDriverRelation.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteOrgDriverRelationTableById = async (req: any, res: any) => {
  const Driver = { ...req.params };

  const orgDriverRelation = new OrgDriverRelationTableService();

  try {
    const orgDriverRelationExistsOrNotExists = await orgDriverRelation.verifyId(
      Number(Driver.id)
    );

    if (orgDriverRelationExistsOrNotExists === false)
      return res.status(404).json({
        error: "no data relationship founded by id sended",
      });

    await orgDriverRelation.deleteById(Driver.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
