import express from "express";

import HandleError from "../../interface/error/handleError";
import DriverDocumentService from "../../services/driver/driverDocumentService";
import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";

const driverDocumentController = express.Router();

const err = new HandleError();

driverDocumentController
  .route("/org/driver/document/save")
  .post(async (req, res) => {
    const DriverDocument = { ...req.body };

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
      const driverDocumentService = new DriverDocumentService(
        DriverDocument.cnh
      );

      await driverDocumentService.save();

      return res.status(201).json({ msg: "driver document saved" });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverDocumentController
  .route("/org/driver/document/update/:id")
  .put(async (req, res) => {
    const DriverDocument = { ...req.body };

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
      const driverDocumentService = new DriverDocumentService(
        DriverDocument.cnh
      );

      await driverDocumentService.update(req.params.id);

      return res.status(201).json({ msg: "driver document updated" });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverDocumentController
  .route("/org/driver/document/get-all")
  .get(async (req, res) => {
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

      const data = await driverDocumentService.getAll();

      if (data.length === 0) {
        return res.status(404).json({
          error: "no data",
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
  });

driverDocumentController
  .route("/org/driver/document/get-by-id/:id")
  .get(async (req, res) => {
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

      if (data.length === 0) {
        return res.status(404).json({
          error: "driver document not found",
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
  });

driverDocumentController
  .route("/org/driver/document/delete-all")
  .delete(async (req, res) => {
    try {
      const driverDocumentService = new DriverDocumentService();

      const driverDocumentExistsOrNotExists =
        await driverDocumentService.getAll();

      if (driverDocumentExistsOrNotExists.length === 0)
        return res.status(404).json({
          error: "no data",
        });

      await driverDocumentService.deleteAll();

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

driverDocumentController
  .route("/org/driver/document/delete-by-id/:id")
  .delete(async (req, res) => {
    const DriverDocument = { ...req.params };

    const driverDocumentService = new DriverDocumentService();

    try {
      const driverDocumentExistsOrNotExists =
        await driverDocumentService.getById(DriverDocument.id);

      if (driverDocumentExistsOrNotExists.length === 0)
        return res.status(404).json({
          error: "driver document not found",
        });

      await driverDocumentService.deleteById(DriverDocument.id);

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

export { driverDocumentController };
