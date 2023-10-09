import OrgContactService from "../../services/org/orgContactService";
import HandleError from "../../../../interface/error/handleError";
import RedisOperations from "../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../security/controllers/cryptography/cryptography";

const err = new HandleError();

export const saveOrgContact = async (req: any, res: any) => {
  const OrgContact = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      OrgContact.telephone,
      "telephone is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgContact.ddd,
      "ddd is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgContact.email,
      "email place is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      OrgContact.telephone.trim(),
      "telephone can not be empty"
    );
    err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), "ddd can not be empty");
    err.exceptionFieldIsEmpty(
      OrgContact.email.trim(),
      "email place can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    OrgContact.telephone = cryptography.encrypt(OrgContact.telephone);
    OrgContact.ddd = cryptography.encrypt(OrgContact.ddd);
    OrgContact.email = cryptography.encrypt(OrgContact.email);

    const orgContactService = new OrgContactService(
      OrgContact.telephone,
      OrgContact.ddd,
      OrgContact.email
    );

    await orgContactService.save();

    const orgFromCache = await cache.getCache(`orgContact`);

    if (orgFromCache) await cache.deleteCache("orgContact");

    return res.status(201).json({
      msg: "organization contact saved",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const updateOrgContact = async (req: any, res: any) => {
  const OrgContact = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      OrgContact.telephone,
      "telephone is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgContact.ddd,
      "ddd is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgContact.email,
      "email place is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      OrgContact.telephone.trim(),
      "telephone can not be empty"
    );
    err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), "ddd can not be empty");
    err.exceptionFieldIsEmpty(
      OrgContact.email.trim(),
      "email place can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const verifyId = new OrgContactService().verifyId(req.params.id);

  const dataIdDbResponse = await verifyId.then((e) => e);

  if (dataIdDbResponse === false)
    return res.status(404).json({
      error: "organization contact not found",
    });

  try {
    OrgContact.telephone = cryptography.encrypt(OrgContact.telephone);
    OrgContact.ddd = cryptography.encrypt(OrgContact.ddd);
    OrgContact.email = cryptography.encrypt(OrgContact.email);

    const orgContactService = new OrgContactService(
      OrgContact.telephone,
      OrgContact.ddd,
      OrgContact.email
    );

    await orgContactService.update(req.params.id);

    const orgFromCache = await cache.getCache(`orgContact`);

    if (orgFromCache) await cache.deleteCache("orgContact");

    const orgFromCacheById = await cache.getCache(
      `orgContact_${req.params.id}`
    );

    if (orgFromCacheById)
      await cache.deleteCache(`orgContact_${req.params.id}`);

    return res.status(201).json({
      msg: "organization contact updated",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getOrgContact = async (req: any, res: any) => {
  const OrgContact = { ...req.query };

  const orgContactService = new OrgContactService();

  const cache = new RedisOperations();

  try {
    const orgContactFromCache = await cache.getCache(`orgContact`);

    if (orgContactFromCache) {
      const data = JSON.parse(orgContactFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgContactService.getAll(
      OrgContact.page,
      OrgContact.size
    );

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`orgContact`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const getOrgContactById = async (req: any, res: any) => {
  const OrgContact = { ...req.params };

  const orgContactService = new OrgContactService();

  const cache = new RedisOperations();

  try {
    const orgContactFromCache = await cache.getCache(
      `orgContact_${OrgContact.id}`
    );

    if (orgContactFromCache) {
      const data = JSON.parse(orgContactFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgContactService.getById(OrgContact.id);

    if (data === "org contact not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(
      `orgContact_${OrgContact.id}`,
      JSON.stringify(data),
      300
    );

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteOrgContactById = async (req: any, res: any) => {
  const OrgContact = { ...req.params };

  const cache = new RedisOperations();

  const orgContactService = new OrgContactService();

  try {
    const verifyId = new OrgContactService();

    const orgContactIdExistsOnDb = await verifyId.verifyId(OrgContact.id);

    if (orgContactIdExistsOnDb === false)
      return res.status(404).json({
        error: "organization contact not found",
      });

    await orgContactService.deleteById(OrgContact.id);

    const orgFromCache = await cache.getCache(`orgContact`);

    if (orgFromCache) await cache.deleteCache("orgContact");

    const orgFromCacheById = await cache.getCache(
      `orgContact_${OrgContact.id}`
    );

    if (orgFromCacheById)
      await cache.deleteCache(`orgContact_${OrgContact.id}`);

    return res.status(204).json({});
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};
