import express from "express";
import OrgIpDataProviderService from "../../services/org/OrgIpDataProviderService";
import HandleError from "../../interface/error/handleError";

import * as dotenv from "dotenv";

import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../config/security/cryptography";

dotenv.config();

const orgIpDataProviderController = express.Router();

const err = new HandleError();

orgIpDataProviderController
  .route("/org/client/machine/data/provider/save")
  .post(async (req, res) => {
    const OrgMachineAndDataProvider = { ...req.body };

    const cryptography = new Cryptography();

    try {
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.ip,
        "ip is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.hostname,
        "hostname is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.city,
        "city is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.region,
        "region is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.country,
        "country is undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.loc,
        "loc data undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.org,
        "org data undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.postal,
        "postal data undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.timezone,
        "timezone undefined or null"
      );
      err.exceptionFieldNullOrUndefined(
        OrgMachineAndDataProvider.readme,
        "readme undefined or null"
      );

      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.ip.trim(),
        "ip can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.hostname.trim(),
        "hostname can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.city.trim(),
        "city can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.region.trim(),
        "region can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.country.trim(),
        "country can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.loc.trim(),
        "loc can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.org.trim(),
        "org can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.postal.trim(),
        "postal can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.timezone.trim(),
        "timezone can not be empty"
      );
      err.exceptionFieldIsEmpty(
        OrgMachineAndDataProvider.readme.trim(),
        "readme can not be empty"
      );
    } catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      OrgMachineAndDataProvider.ip = cryptography.encrypt(OrgMachineAndDataProvider.ip);
      OrgMachineAndDataProvider.hostname = cryptography.encrypt(
        OrgMachineAndDataProvider.hostname
      );
      OrgMachineAndDataProvider.city = cryptography.encrypt(OrgMachineAndDataProvider.city);
      OrgMachineAndDataProvider.region = cryptography.encrypt(OrgMachineAndDataProvider.region);
      OrgMachineAndDataProvider.country = cryptography.encrypt(
        OrgMachineAndDataProvider.country
      );
      OrgMachineAndDataProvider.loc = cryptography.encrypt(OrgMachineAndDataProvider.loc);
      OrgMachineAndDataProvider.org = cryptography.encrypt(OrgMachineAndDataProvider.org);
      OrgMachineAndDataProvider.postal = cryptography.encrypt(OrgMachineAndDataProvider.postal);
      OrgMachineAndDataProvider.timezone = cryptography.encrypt(
        OrgMachineAndDataProvider.timezone
      );
      OrgMachineAndDataProvider.readme = cryptography.encrypt(OrgMachineAndDataProvider.readme);

      new OrgIpDataProviderService(
        OrgMachineAndDataProvider.ip,
        OrgMachineAndDataProvider.hostname,
        OrgMachineAndDataProvider.city,
        OrgMachineAndDataProvider.region,
        OrgMachineAndDataProvider.country,
        OrgMachineAndDataProvider.loc,
        OrgMachineAndDataProvider.org,
        OrgMachineAndDataProvider.postal,
        OrgMachineAndDataProvider.timezone,
        OrgMachineAndDataProvider.readme
      ).save();

      return res.status(201).json({
        data: "organization data machine and provider saved",
      });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgIpDataProviderController
  .route("/org/client/machine/data/provider/get/all")
  .get(async (req, res) => {
    const OrgIpDataProvider = { ...req.query };

    const orgIpDataProviderService = new OrgIpDataProviderService();

    const cache = new RedisOperations();

    try {
      const orgIpDataProviderFromCache = await cache.getCache(
        `orgIpDataProvider`
      );

      if (orgIpDataProviderFromCache) {
        const data = JSON.parse(orgIpDataProviderFromCache);

        return res.status(200).json({
          data: { inCache: "yes", data },
        });
      }

      const data = await orgIpDataProviderService.getAll(
        OrgIpDataProvider.page,
        OrgIpDataProvider.size
      );

      if (data === "no data") {
        return res.status(404).json({
          error: data,
        });
      }

      await cache.setCache(`orgIpDataProvider`, JSON.stringify(data), 300);

      return res.status(200).json({
        data: { inCache: "no", data },
      });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

orgIpDataProviderController
  .route("/org/client/machine/data/provider/get/by/id/:id")
  .get(async (req, res) => {
    const OrgIpDataProvider = { ...req.params };

    const orgIpDataProviderService = new OrgIpDataProviderService();

    const cache = new RedisOperations();

    try {
      const orgIpDataProviderFromCache = await cache.getCache(
        `orgIpDataProvider_${OrgIpDataProvider.id}`
      );

      if (orgIpDataProviderFromCache) {
        const data = JSON.parse(orgIpDataProviderFromCache);

        return res.status(200).json({
          data: { inCache: "yes", data },
        });
      }

      const data = await orgIpDataProviderService.getById(OrgIpDataProvider.id);

      if (data === "org not found") {
        return res.status(404).json({
          error: data,
        });
      }

      await cache.setCache(
        `orgIpDataProvider_${OrgIpDataProvider.id}`,
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

orgIpDataProviderController
  .route("/org/client/machine/data/provider/delete/by/id/:id")
  .delete(async (req, res) => {
    const OrgIpDataProvider = { ...req.params };

    const orgIpDataProviderService = new OrgIpDataProviderService();

    try {
      const verifyId = await orgIpDataProviderService.verifyId(
        OrgIpDataProvider.id
      );

      if (verifyId === false)
        return res.status(404).json({
          error: "organization not found",
        });

      await orgIpDataProviderService.deleteById(OrgIpDataProvider.id);

      return res.status(204).json();
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

export { orgIpDataProviderController };
