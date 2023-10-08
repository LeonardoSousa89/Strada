import orgAndOrgIpDataProviderRelationTableService from "../../../services/org/relations/orgAndOrgIpDataProviderRelationTableService";
import HandleError from "../../../../../interface/error/handleError";
import OrgService from "../../../services/org/orgService";
import OrgIpDataProviderService from "../../../services/org/OrgIpDataProviderService";
import OrgAndOrgIpDataProviderRelationTableService from "../../../services/org/relations/orgAndOrgIpDataProviderRelationTableService";

const err = new HandleError();

export const saveOrgAndOrgIpDataProviderRelationTable = async (
  req: any,
  res: any
) => {
  const Org = { ...req.body };

  try {
    err.exceptionFieldNullOrUndefined(
      Org.org_ip_data_provider_relation_id,
      "org machine client ip and provider id is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.org_relation_id,
      "org id is undefined or null"
    );

    err.exceptionFieldIsEqualZero(
      Org.org_ip_data_provider_relation_id,
      "org machine client ip and provider id code can not be 0"
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

  const verifyOrgIpDataProviderIdExixts =
    await new OrgIpDataProviderService().verifyId(
      Org.org_ip_data_provider_relation_id
    );

  if (verifyOrgIpDataProviderIdExixts == false)
    return res.status(404).json({
      error: "organization machine client ip and provider data id not found",
    });

  const verifyRelationshipExists =
    await new orgAndOrgIpDataProviderRelationTableService().verifyRelationshipExists(
      Org.org_ip_data_provider_relation_id
    );

  if (verifyRelationshipExists == true)
    return res.status(400).json({
      error: "relationship already exists",
    });

  try {
    const response = new orgAndOrgIpDataProviderRelationTableService(
      Org.org_ip_data_provider_relation_id,
      Org.org_relation_id
    );

    await response.save();

    return res.status(201).json({
      msg: "organization machine client ip and provider data relation saved",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getOrgAndOrgIpDataProviderRelationTable = async (
  req: any,
  res: any
) => {
  const orgAndOrgIpDataProviderRelationTableService =
    new OrgAndOrgIpDataProviderRelationTableService();

  try {
    const data = await orgAndOrgIpDataProviderRelationTableService.getAll();

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

export const getOrgAndOrgIpDataProviderRelationTableById = async (
  req: any,
  res: any
) => {
  const Org = { ...req.params };

  const orgAndOrgIpDataProviderRelationTableService =
    new OrgAndOrgIpDataProviderRelationTableService();
  try {
    const data = await orgAndOrgIpDataProviderRelationTableService.getById(
      Org.id
    );

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

export const deleteOrgAndOrgIpDataProviderRelationTable = async (
  req: any,
  res: any
) => {
  const orgAndOrgIpDataProviderRelationTableService =
    new OrgAndOrgIpDataProviderRelationTableService();

  try {
    const orgAndOrgIpDataProviderRelationExistsOrNotExists =
      await orgAndOrgIpDataProviderRelationTableService.getAll();

    if (orgAndOrgIpDataProviderRelationExistsOrNotExists.length === 0)
      return res.status(404).json({
        error: "no data relationship",
      });

    await orgAndOrgIpDataProviderRelationTableService.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteOrgAndOrgIpDataProviderRelationTableById = async (
  req: any,
  res: any
) => {
  const Driver = { ...req.params };

  const orgAndOrgIpDataProviderRelationTableService =
    new OrgAndOrgIpDataProviderRelationTableService();
  try {
    const orgAndOrgIpDataProviderRelationExistsOrNotExists =
      await orgAndOrgIpDataProviderRelationTableService.verifyId(
        Number(Driver.id)
      );

    if (orgAndOrgIpDataProviderRelationExistsOrNotExists === false)
      return res.status(404).json({
        error: "no data relationship founded by id sended",
      });

    await orgAndOrgIpDataProviderRelationTableService.deleteById(Driver.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
