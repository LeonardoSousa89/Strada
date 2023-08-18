import express from "express";
import OrgAddressService from "../../services/org/orgAddressService";
import HandleError from "../../interface/error/handleError";
import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../config/security/cryptography";

const orgAddressController = express.Router();

const err = new HandleError();

orgAddressController.route("/org/address/save").post(async (req, res) => {
  const OrgAddress = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      OrgAddress.zip_code,
      "zip code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.street_type,
      "street type is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.public_place,
      "public place is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.org_number,
      "number is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.neighborhood,
      "neighborhood is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.county,
      "county is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.country,
      "country is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      OrgAddress.zip_code.trim(),
      "zip code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.street_type.trim(),
      "street type can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.public_place.trim(),
      "public place can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.org_number.trim(),
      "number can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.neighborhood.trim(),
      "neighborhood can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.county.trim(),
      "county can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.country.trim(),
      "country can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  try {

    OrgAddress.zip_code = cryptography.encrypt(OrgAddress.zip_code);
    OrgAddress.street_type = cryptography.encrypt(OrgAddress.street_type);
    OrgAddress.public_place = cryptography.encrypt(OrgAddress.public_place);
    OrgAddress.org_number = cryptography.encrypt(OrgAddress.org_number);
    OrgAddress.complement = cryptography.encrypt(OrgAddress.complement);
    OrgAddress.neighborhood = cryptography.encrypt(OrgAddress.neighborhood);
    OrgAddress.county = cryptography.encrypt(OrgAddress.county);
    OrgAddress.country = cryptography.encrypt(OrgAddress.country);

    const orgAddressService = new OrgAddressService(
      OrgAddress.zip_code,
      OrgAddress.street_type,
      OrgAddress.public_place,
      OrgAddress.org_number,
      OrgAddress.complement,
      OrgAddress.neighborhood,
      OrgAddress.county,
      OrgAddress.country
    );

    await orgAddressService.save();

    return res.status(201).json({
      msg: "organization address saved",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgAddressController.route("/org/address/update/:id").put(async (req, res) => {
  const OrgAddress = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      OrgAddress.zip_code,
      "zip code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.street_type,
      "street type is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.public_place,
      "public place is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.org_number,
      "number is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.neighborhood,
      "neighborhood is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.county,
      "county is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      OrgAddress.country,
      "country is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      OrgAddress.zip_code.trim(),
      "zip code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.street_type.trim(),
      "street type can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.public_place.trim(),
      "public place can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.org_number.trim(),
      "number can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.neighborhood.trim(),
      "neighborhood can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.county.trim(),
      "county can not be empty"
    );
    err.exceptionFieldIsEmpty(
      OrgAddress.country.trim(),
      "country can not be empty"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const verifyId = new OrgAddressService().verifyId(req.params.id);

  const orgAddressIdExistsOnDb = await verifyId.then((e) => e);

  if (orgAddressIdExistsOnDb === false)
    return res.status(404).json({
      error: "organization address not found",
    });

  try {

    OrgAddress.zip_code = cryptography.encrypt(OrgAddress.zip_code);
    OrgAddress.street_type = cryptography.encrypt(OrgAddress.street_type);
    OrgAddress.public_place = cryptography.encrypt(OrgAddress.public_place);
    OrgAddress.org_number = cryptography.encrypt(OrgAddress.org_number);
    OrgAddress.complement = cryptography.encrypt(OrgAddress.complement);
    OrgAddress.neighborhood = cryptography.encrypt(OrgAddress.neighborhood);
    OrgAddress.county = cryptography.encrypt(OrgAddress.county);
    OrgAddress.country = cryptography.encrypt(OrgAddress.country);

    const orgAddressService = new OrgAddressService(
      OrgAddress.zip_code,
      OrgAddress.street_type,
      OrgAddress.public_place,
      OrgAddress.org_number,
      OrgAddress.complement,
      OrgAddress.neighborhood,
      OrgAddress.county,
      OrgAddress.country
    );

    await orgAddressService.update(req.params.id);

    return res.status(201).json({
      msg: "organization address updated",
    });
  } catch (__) {
    res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgAddressController.route("/org/address/get-all").get(async (req, res) => {
  const OrgAddress = { ...req.query };

  const orgAddressService = new OrgAddressService();

  const cache = new RedisOperations();

  try {
    const orgAddressFromCache = await cache.getCache(`orgAddress`);

    if (orgAddressFromCache) {
      const data = JSON.parse(orgAddressFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgAddressService.getAll(
      OrgAddress.page,
      OrgAddress.size
    );

    if (data === 'no data') {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`orgAddress`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgAddressController
  .route("/org/address/get-by-id/:id")
  .get(async (req, res) => {
    const OrgAddress = { ...req.params };

    const orgAddressService = new OrgAddressService();

    const cache = new RedisOperations();

    try {
      const orgAddressFromCache = await cache.getCache(
        `orgAddress_${OrgAddress.id}`
      );

      if (orgAddressFromCache) {
        const data = JSON.parse(orgAddressFromCache);

        return res.status(200).json({
          data: { inCache: "yes", data },
        });
      }

      const data = await orgAddressService.getById(OrgAddress.id);

      if (data === 'organization address not found') {
        return res.status(404).json({
          error: data,
        });
      }

      await cache.setCache(
        `orgAddress_${OrgAddress.id}`,
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

orgAddressController
  .route("/org/address/delete-by-id/:id")
  .delete(async (req, res) => {
    const OrgAddress = { ...req.params };

    const orgAddressService = new OrgAddressService();

    try {
      const verifyId = await orgAddressService.verifyId(OrgAddress.id);

      if (verifyId === false)
        return res.status(404).json({
          error: "organization address not found",
        });

      orgAddressService.deleteById(OrgAddress.id);

      return res.status(204).json({});
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server",
      });
    }
  });

export { orgAddressController };
