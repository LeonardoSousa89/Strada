import HandleError from "../../../../interface/error/handleError";
import DriverContactService from "../../services/driver/driverContactService";
import RedisOperations from "../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../security/controllers/cryptography/cryptography";

const err = new HandleError();

export const saveDriverContact = async (req: any, res: any) => {
  const DriverContact = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverContact.telephone,
      "telephone is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverContact.telephone.trim(),
      "telephone can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    DriverContact.telephone = cryptography.encrypt(DriverContact.telephone);

    const driverContactService = new DriverContactService(
      DriverContact.telephone
    );

    await driverContactService.save();

    const driverContactFromCache = await cache.getCache(`driverContact`);

    if (driverContactFromCache) await cache.deleteCache("driverContact");

    return res.status(201).json({ msg: "driver telephone save" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
export const updateDriverContact = async (req: any, res: any) => {
  const DriverContact = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverContact.telephone,
      "telephone is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverContact.telephone.trim(),
      "telephone can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const driverTelephoneExistsOrNotExists =
    await new DriverContactService().verifyId(req.params.id);

  if (driverTelephoneExistsOrNotExists === false)
    return res.status(404).json({
      error: "driver telephone not found",
    });

  try {
    DriverContact.telephone = cryptography.encrypt(DriverContact.telephone);

    const driverContactService = new DriverContactService(
      DriverContact.telephone
    );

    await driverContactService.update(req.params.id);

    const driverContactFromCache = await cache.getCache(`driverContact`);

    if (driverContactFromCache) await cache.deleteCache("driverContact");

    const driverContactFromCacheById = await cache.getCache(
      `driverContact_${req.params.id}`
    );

    if (driverContactFromCacheById)
      await cache.deleteCache(`driverContact_${req.params.id}`);

    return res.status(201).json({ msg: "driver telephone update" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverContact = async (req: any, res: any) => {
  const DriverContact = { ...req.query };

  const driverContactService = new DriverContactService();

  const cache = new RedisOperations();

  try {
    const driverContactFromCache = await cache.getCache(`driverContact`);

    if (driverContactFromCache) {
      const data = JSON.parse(driverContactFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverContactService.getAll(
      DriverContact.page,
      DriverContact.size
    );

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`driverContact`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverContactById = async (req: any, res: any) => {
  const DriverContact = { ...req.params };

  const driverContactService = new DriverContactService();

  const cache = new RedisOperations();

  try {
    const driverContactFromCache = await cache.getCache(
      `driverContact_${DriverContact.id}`
    );

    if (driverContactFromCache) {
      const data = JSON.parse(driverContactFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverContactService.getById(DriverContact.id);

    if (data === "driver contact not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(
      `driverContact_${DriverContact.id}`,
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

export const deleteAllDriverContact = async (req: any, res: any) => {
  const driverContactService = new DriverContactService();

  const cache = new RedisOperations();

  try {
    const driverContactExistsOrNotExists = await driverContactService.getAll();

    if (driverContactExistsOrNotExists === "no data")
      return res.status(404).json({
        error: driverContactExistsOrNotExists,
      });

    const allDriverContact: any = await driverContactService.getAll();

    for (let id in allDriverContact) {
      const driverContactId: any = allDriverContact[id].driver_contact_id;
      const driverContactFromCacheById = await cache.getCache(
        `driverContact_${driverContactId}`
      );
      if (driverContactFromCacheById)
        await cache.deleteCache(`driverContact_${driverContactId}`);
    }

    await driverContactService.deleteAll();

    const driverContactFromCache = await cache.getCache(`driverContact`);

    if (driverContactFromCache) await cache.deleteCache("driverContact");

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const deleteDriverContactById = async (req: any, res: any) => {
  const DriverContact = { ...req.params };

  const cache = new RedisOperations();

  const driverContactService = new DriverContactService();

  try {
    const driverExistsOrNotExists = await driverContactService.getById(
      DriverContact.id
    );

    if (driverExistsOrNotExists === "driver contact not found")
      return res.status(404).json({
        error: driverExistsOrNotExists,
      });

    await driverContactService.deleteById(DriverContact.id);

    const driverContactFromCache = await cache.getCache(`driverContact`);

    if (driverContactFromCache) await cache.deleteCache("driverContact");

    const driverContactFromCacheById = await cache.getCache(
      `driverContact_${DriverContact.id}`
    );

    if (driverContactFromCacheById)
      await cache.deleteCache(`driverContact_${DriverContact.id}`);

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
