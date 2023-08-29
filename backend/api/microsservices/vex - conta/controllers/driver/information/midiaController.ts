import express from "express";

import HandleError from "../../../interface/error/handleError";
import RedisOperations from "../../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../../config/security/cryptography";

import MidiaService from "../../../services/driver/information/midiaService";

const midiaController = express.Router();

const err = new HandleError();

midiaController
  .route("/org/driver/information/midia/uri/save")
  .post(async (req, res) => {
    const Midia = { ...req.body };

    const cryptography = new Cryptography();

    try {
      err.exceptionFieldNullOrUndefined(
        Midia.uri,
        "uri is undefined or null"
      );
      err.exceptionFieldIsEmpty(
        Midia.uri,
        "uri can not be empty"
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
    //   Midia.uri = cryptography.encrypt(Midia.uri);

      const midiaService = new MidiaService(
        Midia.uri
      );

      await midiaService.save();

      return res.status(201).json({ msg: "midia uri saved" });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

midiaController
  .route("/org/driver/information/midia/uri/get-all")
  .get(async (req, res) => {
    const Midia = { ...req.query };

    const midiaService = new MidiaService();

    const cache = new RedisOperations();

    try {
      const midiaFromCache = await cache.getCache(`midia_uri`);

      if (midiaFromCache) {
        const data = JSON.parse(midiaFromCache);

        return res.status(200).json({
          data: { inCache: "yes", data },
        });
      }

      const data = await midiaService.getAll(
        Midia.page,
        Midia.size
      );

      if (data === "no data") {
        return res.status(404).json({
          error: data,
        });
      }

      await cache.setCache(`midia_uri`, JSON.stringify(data), 300);

      return res.status(200).json({
        data: { inCache: "no", data },
      });
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

midiaController
  .route("/org/driver/information/midia/uri/get-by-id/:id")
  .get(async (req, res) => {
    const Midia = { ...req.params };

    const midiaService = new MidiaService();

    const cache = new RedisOperations();

    try {
      const midiaFromCache = await cache.getCache(
        `midia_uri_${Midia.id}`
      );

      if (midiaFromCache) {
        const data = JSON.parse(midiaFromCache);

        return res.status(200).json({
          data: { inCache: "yes", data },
        });
      }

      const data = await midiaService.getById(Midia.id);

      if (data === "midia not found") {
        return res.status(404).json({
          error: data,
        });
      }

      await cache.setCache(
        `midia_uri_${Midia.id}`,
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

midiaController
  .route("/org/driver/information/midia/uri/delete-all")
  .delete(async (req, res) => {
    const midiaService = new MidiaService();

    try {
      const midiaUriExistsOrNotExists =
        await midiaService.getAll();

      if (midiaUriExistsOrNotExists === "no data")
        return res.status(404).json({
          error: midiaUriExistsOrNotExists,
        });

      await midiaService.deleteAll();

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server"+__ });
    }
  });

midiaController
  .route("/org/driver/information/midia/uri/delete-by-id/:id")
  .delete(async (req, res) => {
    const Midia = { ...req.params };

    const midiaService = new MidiaService();

    try {
      const midiaUriExistsOrNotExists =
        await midiaService.getById(Midia.id);

      if (midiaUriExistsOrNotExists === "midia not found")
        return res.status(404).json({
          error: midiaUriExistsOrNotExists,
        });

      await midiaService.deleteById(Midia.id);

      return res.status(204).json({});
    } catch (__) {
      return res
        .status(500)
        .json({ error: "i am sorry, there is an error with server" });
    }
  });

export { midiaController };
