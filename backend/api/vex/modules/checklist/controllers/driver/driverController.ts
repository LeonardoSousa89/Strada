import DriverService from "../../services/driver/driverService";

import HandleError from "../../../../interface/error/handleError";
import RedisOperations from "../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../security/controllers/cryptography/cryptography";

const err = new HandleError();

export const saveDriver = async (req: any, res: any) => {
  const Driver = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.first_name,
      "first name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.last_name,
      "last name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.email,
      "email place is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.password,
      "password place is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      Driver.first_name.trim(),
      "first name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.last_name.trim(),
      "last name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.email.trim(),
      "email place can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.password.trim(),
      "password place can not be empty"
    );

    err.exceptionFieldValueLessToType(
      Driver.password,
      "password can not be less than 4"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const emailIdExistsOnDb = await new DriverService().verifyEmail(Driver.email);

  if (emailIdExistsOnDb === true)
    return res.status(400).json({
      error: "email already exists",
    });

  try {
    Driver.first_name = cryptography.encrypt(Driver.first_name);
    Driver.last_name = cryptography.encrypt(Driver.last_name);
    Driver.email = cryptography.encrypt(Driver.email);

    Driver.password = cryptography.hash(Driver.password);

    const driverService = new DriverService(
      Driver.first_name,
      Driver.last_name,
      Driver.email,
      Driver.password
    );

    await driverService.save();

    const driverFromCache = await cache.getCache(`driver`);

    if (driverFromCache) await cache.deleteCache("driver");

    return res.status(201).json({ msg: "driver saved" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const updateDriver = async (req: any, res: any) => {
  const Driver = { ...req.body };

  const cache = new RedisOperations();

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      Driver.first_name,
      "first name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.last_name,
      "last name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.email,
      "email place is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Driver.password,
      "password place is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      Driver.first_name.trim(),
      "first name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.last_name.trim(),
      "last name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.email.trim(),
      "email place can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Driver.password.trim(),
      "password place can not be empty"
    );

    err.exceptionFieldValueLessToType(
      Driver.password,
      "password can not be less than 4"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  //verificar se ao atualizar o email já existe e tratar, pois está retornando 500

  const driverIdExistsOnDb = await new DriverService().verifyId(req.params.id);

  if (driverIdExistsOnDb === false)
    return res.status(404).json({
      error: "driver not found",
    });

  try {
    Driver.first_name = cryptography.encrypt(Driver.first_name);
    Driver.last_name = cryptography.encrypt(Driver.last_name);
    Driver.email = cryptography.encrypt(Driver.email);

    Driver.password = cryptography.hash(Driver.password);

    const driverService = new DriverService(
      Driver.first_name,
      Driver.last_name,
      Driver.email,
      Driver.password
    );

    await driverService.update(req.params.id);

    const driverFromCache = await cache.getCache(`driver`);

    if (driverFromCache) await cache.deleteCache("driver");

    const driverFromCacheById = await cache.getCache(`driver_${req.params.id}`);

    if (driverFromCacheById) await cache.deleteCache(`driver_${req.params.id}`);

    return res.status(201).json({ msg: "driver updated" });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriver = async (req: any, res: any) => {
  const Driver = { ...req.query };

  const driverService = new DriverService();

  const cache = new RedisOperations();

  try {
    const driverFromCache = await cache.getCache(`driver`);

    if (driverFromCache) {
      const data = JSON.parse(driverFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverService.getAll(Driver.page, Driver.size);

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`driver`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverById = async (req: any, res: any) => {
  const Driver = { ...req.params };

  const driverService = new DriverService();

  const cache = new RedisOperations();

  try {
    const driverFromCache = await cache.getCache(`driver_${Driver.id}`);

    if (driverFromCache) {
      const data = JSON.parse(driverFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverService.getById(Driver.id);

    if (data === "driver not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`driver_${Driver.id}`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
};

export const deleteAllDriver = async (req: any, res: any) => {
  const driverService = new DriverService();

  const cache = new RedisOperations();

  try {
    const driverIdExistsOnDb = await driverService.getAll();

    if (driverIdExistsOnDb === "no data")
      return res.status(404).json({
        error: driverIdExistsOnDb,
      });

    await driverService.deleteAll();

    const driverFromCache = await cache.getCache(`driver`);

    if (driverFromCache) await cache.deleteCache("driver");

    //código para deletar também todas as keys por id

    return res.status(204).json({});
  } catch (e) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const deleteDriverById = async (req: any, res: any) => {
  const driverService = new DriverService();

  const cache = new RedisOperations();

  const Driver = { ...req.params };

  try {
    const driverIdExistsOnDb = await driverService.getById(Driver.id);

    if (driverIdExistsOnDb === "driver not found")
      return res.status(404).json({
        error: driverIdExistsOnDb,
      });

    await driverService.deleteById(Driver.id);

    const driverFromCache = await cache.getCache(`driver`);

    if (driverFromCache) await cache.deleteCache("driver");

    const driverFromCacheById = await cache.getCache(`driver_${Driver.id}`);

    if (driverFromCacheById) await cache.deleteCache(`driver_${Driver.id}`);

    return res.status(204).json({});
  } catch (e) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
