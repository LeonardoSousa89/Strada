import HandleError from "../../../../interface/error/handleError";
import DriverAddressService from "../../services/driver/driverAddressService";
import axios from "axios";
import * as dotenv from "dotenv";
import RedisOperations from "../../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../security/controllers/cryptography/cryptography";

dotenv.config();

const err = new HandleError();

// https://brasilaberto.com/blog/posts/5-melhores-apis-de-cep-2023
export const getZipCode = async (req: any, res: any) => {
  const DriverAddress = { ...req.query };

  if (!DriverAddress.ZipCode)
    return res.status(400).json({ error: "query params required" });

  try {
    const zipcode = Number(DriverAddress.ZipCode);

    const url = `${process.env.CEP_API_URL_BASE}/v1/${zipcode}`;

    const verifyZipCode = new DriverAddressService();

    const getZipCode = await verifyZipCode.getZipCode(axios, url);

    return res.status(200).json(getZipCode);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error to try verify your zip code" + __,
    });
  }
};
export const saveDriverAddress = async (req: any, res: any) => {
  const DriverAddress = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverAddress.zip_code,
      "zip code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      DriverAddress.state,
      "state is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      DriverAddress.city,
      "city is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverAddress.zip_code.trim(),
      "zip code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      DriverAddress.state.trim(),
      "state can not be empty"
    );
    err.exceptionFieldIsEmpty(
      DriverAddress.city.trim(),
      "city can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {
    DriverAddress.zip_code = cryptography.encrypt(DriverAddress.zip_code);
    DriverAddress.state = cryptography.encrypt(DriverAddress.state);
    DriverAddress.city = cryptography.encrypt(DriverAddress.city);

    const driverAddressService = new DriverAddressService(
      DriverAddress.zip_code,
      DriverAddress.state,
      DriverAddress.city
    );

    await driverAddressService.save();

    return res.status(201).json({ msg: "driver address saved" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const updateDriverAddress = async (req: any, res: any) => {
  const DriverAddress = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      DriverAddress.zip_code,
      "zip code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      DriverAddress.state,
      "state is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      DriverAddress.city,
      "city is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      DriverAddress.zip_code.trim(),
      "zip code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      DriverAddress.state.trim(),
      "state can not be empty"
    );
    err.exceptionFieldIsEmpty(
      DriverAddress.city.trim(),
      "city can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const driverAddressIdExistsOnDb = await new DriverAddressService().verifyId(
    req.params.id
  );

  if (driverAddressIdExistsOnDb === false)
    return res.status(404).json({
      error: "driver not found",
    });

  try {
    DriverAddress.zip_code = cryptography.encrypt(DriverAddress.zip_code);
    DriverAddress.state = cryptography.encrypt(DriverAddress.state);
    DriverAddress.city = cryptography.encrypt(DriverAddress.city);

    const driverAddressService = new DriverAddressService(
      DriverAddress.zip_code,
      DriverAddress.state,
      DriverAddress.city
    );

    await driverAddressService.update(req.params.id);

    return res.status(201).json({ msg: "driver address updated" });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverAddress = async (req: any, res: any) => {
  const DriverAddress = { ...req.query };

  const driverAddressService = new DriverAddressService();

  const cache = new RedisOperations();

  try {
    const driverAddressFromCache = await cache.getCache(`driverAddress`);

    if (driverAddressFromCache) {
      const data = JSON.parse(driverAddressFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverAddressService.getAll(
      DriverAddress.page,
      DriverAddress.size
    );

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`driverAddress`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const getDriverAddressById = async (req: any, res: any) => {
  const DriverAddress = { ...req.params };

  const driverAddressService = new DriverAddressService();

  const cache = new RedisOperations();

  try {
    const driverAddressFromCache = await cache.getCache(
      `driverAddress_${DriverAddress.id}`
    );

    if (driverAddressFromCache) {
      const data = JSON.parse(driverAddressFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await driverAddressService.getById(DriverAddress.id);

    if (data === "driver address not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(
      `driverAddress_${DriverAddress.id}`,
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

export const deleteAllDriverAddress = async (req: any, res: any) => {
  const driverAddressService = new DriverAddressService();

  try {
    const driverAddressExistsOrNotExists = await driverAddressService.getAll();

    if (driverAddressExistsOrNotExists === "no data")
      return res.status(404).json({
        error: driverAddressExistsOrNotExists,
      });

    await driverAddressService.deleteAll();

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};

export const deleteDriverAddressById = async (req: any, res: any) => {
  const DriverAddress = { ...req.params };

  const driverAddressService = new DriverAddressService();

  try {
    const driverExistsOrNotExists = await driverAddressService.getById(
      DriverAddress.id
    );

    if (driverExistsOrNotExists === "driver address not found")
      return res.status(404).json({
        error: driverExistsOrNotExists,
      });

    await driverAddressService.deleteById(DriverAddress.id);

    return res.status(204).json({});
  } catch (__) {
    return res
      .status(500)
      .json({ error: "i am sorry, there is an error with server" });
  }
};
