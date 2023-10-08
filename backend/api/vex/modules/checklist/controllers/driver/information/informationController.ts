import HandleError from "../../../../../interface/error/handleError";
import InformationService from "../../../services/driver/information/informationService";
import RedisOperations from "../../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../../security/controllers/cryptography/cryptography";
import Time from "../../../../../config/tools/time";

const err = new HandleError();

export const saveInformation = async (req: any, res: any) => {
  const Information = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      Information.plate,
      "plate is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Information.notes,
      "notes is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      Information.plate.trim(),
      "plate can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Information.notes.trim(),
      "notes can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const startingKmOrFinalKmBothIsIlegalCondition =
    new InformationService().verifyInformation(
      Information.starting_km,
      Information.final_km
    );

  if (startingKmOrFinalKmBothIsIlegalCondition === false)
    return res.status(400).json({
      error: "starting km and final km both can not be empty or null",
    });

  try {
    Information.starting_km = cryptography.encrypt(Information.starting_km);
    Information.final_km = cryptography.encrypt(Information.final_km);
    Information.plate = cryptography.encrypt(Information.plate);
    Information.notes = cryptography.encrypt(Information.notes);

    let date_time_registry = new Time().getTime();

    date_time_registry = cryptography.encrypt(date_time_registry);

    const informationService = new InformationService(
      Information.starting_km,
      Information.final_km,
      Information.plate,
      Information.notes,
      date_time_registry
    );

    await informationService.save();

    return res.status(201).json({ msg: "driver information saved" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getInformation = async (req: any, res: any) => {
  const Information = { ...req.query };

  const informationService = new InformationService();

  const cache = new RedisOperations();

  try {
    const informationFromCache = await cache.getCache(`information`);

    if (informationFromCache) {
      const data = JSON.parse(informationFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await informationService.getAll(
      Information.page,
      Information.size
    );

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`information`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getInformationById = async (req: any, res: any) => {
  const Information = { ...req.params };

  const informationService = new InformationService();

  const cache = new RedisOperations();

  try {
    const informationFromCache = await cache.getCache(
      `information_${Information.id}`
    );

    if (informationFromCache) {
      const data = JSON.parse(informationFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await informationService.getById(Information.id);

    if (data === "information not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(
      `information_${Information.id}`,
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

export const deleteAllInformation = async (req: any, res: any) => {
  const informationService = new InformationService();

  try {
    const driverInformationExistsOrNotExists =
      await informationService.getAll();

    if (driverInformationExistsOrNotExists === "no data")
      return res.status(404).json({
        error: driverInformationExistsOrNotExists,
      });

    await informationService.deleteAll();

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const deleteInformationById = async (req: any, res: any) => {
  const Information = { ...req.params };

  const informationService = new InformationService();

  try {
    const driverInformationExistsOrNotExists = await informationService.getById(
      Information.id
    );

    if (driverInformationExistsOrNotExists === "information not found")
      return res.status(404).json({
        error: driverInformationExistsOrNotExists,
      });

    await informationService.deleteById(Information.id);

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
