import express from "express";

import HandleError from "../../interface/error/handleError";
import DriverContactService from "../../services/driver/driverContactService";
import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../config/security/cryptography";

const driverContactController = express.Router();

const err = new HandleError();

driverContactController
  .route("/org/driver/contact/save")
  .post(async (req, res) => {
    const DriverContact = { ...req.body };

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

      return res.status(201).json({ msg: "driver telephone save" });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverContactController
  .route("/org/driver/contact/update/:id")
  .put(async (req, res) => {
    const DriverContact = { ...req.body };

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

      return res.status(201).json({ msg: "driver telephone update" });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverContactController
  .route("/org/driver/contact/get-all")
  .get(async (req, res) => {
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

      if (data === 'no data') {
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
  });

driverContactController
  .route("/org/driver/contact/get-by-id/:id")
  .get(async (req, res) => {
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

      if (data === 'driver contact not found') {
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
  });

driverContactController
  .route("/org/driver/contact/delete-all")
  .delete(async (req, res) => {
    const driverContactService = new DriverContactService();

    try {
      const driverContactExistsOrNotExists =
        await driverContactService.getAll();

      if (driverContactExistsOrNotExists === 'no data')
        return res.status(404).json({
          error: driverContactExistsOrNotExists,
        });

      await driverContactService.deleteAll();

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverContactController
  .route("/org/driver/contact/delete-by-id/:id")
  .delete(async (req, res) => {
    const DriverContact = { ...req.params };

    const driverContactService = new DriverContactService();

    try {
      const driverExistsOrNotExists = await driverContactService.getById(
        DriverContact.id
      );

      if (driverExistsOrNotExists === 'driver contact not found')
        return res.status(404).json({
          error: driverExistsOrNotExists,
        });

      await driverContactService.deleteById(DriverContact.id);

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

export { driverContactController };
