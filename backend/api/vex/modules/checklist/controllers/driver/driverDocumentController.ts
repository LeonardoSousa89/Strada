import HandleError from "../../../../interface/error/handleError";
import DriverDocumentService from "../../services/driver/driverDocumentService";
import RedisOperations from "../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../security/controllers/cryptography/cryptography";

const err = new HandleError();

export const saveDriverDocument = async (req: any, res: any) => {
  const DriverDocument = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverDocument.cnh,
      "document is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverDocument.cnh.trim(),
      "document can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const driverDocumentExistsOrNotExists =
    await new DriverDocumentService().verifyDocument(DriverDocument.cnh);

  if (driverDocumentExistsOrNotExists === true)
    return res.status(400).json({
      error: "driver document already exists",
    });

  try {
    DriverDocument.cnh = cryptography.encrypt(DriverDocument.cnh);

    const driverDocumentService = new DriverDocumentService(DriverDocument.cnh);

    await driverDocumentService.save();

    const driverDocumentFromCache = await cache.getCache(`driverDocument`);

    if (driverDocumentFromCache) await cache.deleteCache("driverDocument");

    return res.status(201).json({ msg: "driver document saved" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const updateDriverDocument = async (req: any, res: any) => {
  const DriverDocument = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverDocument.cnh,
      "document is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverDocument.cnh.trim(),
      "document can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const driverDocumentExistsOrNotExists =
    await new DriverDocumentService().verifyId(req.params.id);

  if (driverDocumentExistsOrNotExists === false)
    return res.status(404).json({
      error: "driver document not found",
    });

  try {
    DriverDocument.cnh = cryptography.encrypt(DriverDocument.cnh);

    const driverDocumentService = new DriverDocumentService(DriverDocument.cnh);

    await driverDocumentService.update(req.params.id);

    const driverDocumentFromCache = await cache.getCache(`driverDocument`);

    if (driverDocumentFromCache) await cache.deleteCache("driverDocument");

    const driverDocumentFromCacheById = await cache.getCache(
      `driverDocument_${req.params.id}`
    );

    if (driverDocumentFromCacheById)
      await cache.deleteCache(`driverDocument_${req.params.id}`);

    return res.status(201).json({ msg: "driver document updated" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverDocument = async (req: any, res: any) => {
  const DriverDocument = { ...req.query };

  const driverDocumentService = new DriverDocumentService();

  const cache = new RedisOperations();

  try {
    const driverDocumentFromCache = await cache.getCache(`driverDocument`);

    if (driverDocumentFromCache) {
      const data = JSON.parse(driverDocumentFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverDocumentService.getAll(
      DriverDocument.page,
      DriverDocument.size
    );

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`driverDocument`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverDocumentById = async (req: any, res: any) => {
  const DriverDocument = { ...req.params };

  const driverDocumentService = new DriverDocumentService();

  const cache = new RedisOperations();

  try {
    const driverDocumentFromCache = await cache.getCache(
      `driverDocument_${DriverDocument.id}`
    );

    if (driverDocumentFromCache) {
      const data = JSON.parse(driverDocumentFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverDocumentService.getById(DriverDocument.id);

    if (data === "driver document not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(
      `driverDocument_${DriverDocument.id}`,
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

export const deleteAllDriverDocument = async (req: any, res: any) => {
  try {
    const driverDocumentService = new DriverDocumentService();

    const cache = new RedisOperations();

    const driverDocumentExistsOrNotExists =
      await driverDocumentService.getAll();

    if (driverDocumentExistsOrNotExists === "no data")
      return res.status(404).json({
        error: driverDocumentExistsOrNotExists,
      });

    const allDriverDocument: any = await driverDocumentService.getAll();

    for (let id in allDriverDocument) {
      const driverDocumentId: any = allDriverDocument[id].driver_document_id;
      const driverDocumentFromCacheById = await cache.getCache(
        `driverDocument_${driverDocumentId}`
      );
      if (driverDocumentFromCacheById)
        await cache.deleteCache(`driverDocument_${driverDocumentId}`);
    }

    await driverDocumentService.deleteAll();

    const driverDocumentFromCache = await cache.getCache(`driverDocument`);

    if (driverDocumentFromCache) await cache.deleteCache("driverDocument");

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const deleteDriverDocumentById = async (req: any, res: any) => {
  const DriverDocument = { ...req.params };

  const cache = new RedisOperations();

  const driverDocumentService = new DriverDocumentService();

  try {
    const driverDocumentExistsOrNotExists = await driverDocumentService.getById(
      DriverDocument.id
    );

    if (driverDocumentExistsOrNotExists === "driver document not found")
      return res.status(404).json({
        error: driverDocumentExistsOrNotExists,
      });

    await driverDocumentService.deleteById(DriverDocument.id);

    const driverDocumentFromCache = await cache.getCache(`driverDocument`);

    if (driverDocumentFromCache) await cache.deleteCache("driverDocument");

    const driverDocumentFromCacheById = await cache.getCache(
      `driverDocument_${DriverDocument.id}`
    );

    if (driverDocumentFromCacheById)
      await cache.deleteCache(`driverDocument_${DriverDocument.id}`);

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
