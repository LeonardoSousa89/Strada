import express from "express";
import OrgService from "../../services/org/orgService";
import HandleError from "../../interface/error/handleError";
import axios from "axios";

import * as dotenv from "dotenv";

import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";
import Cryptography from "../../config/security/cryptography";

dotenv.config();

const orgController = express.Router();

const err = new HandleError();

orgController.route("/org/verify-cnpj").get(async (req, res) => {
  const Org = { ...req.query };

  const url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;

  try {
    const response = await axios.get(url);

    if (response.data.error)
      return res.status(404).json({
        organizationExists: false,
      });
    else
      return res.status(200).json({
        organizationExists: true,
      });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/save").post(async (req, res) => {
  const Org = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      Org.fantasy_name,
      "fantasy name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.corporate_name,
      "corporate name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(Org.cnpj, "cnpj is undefined or null");
    err.exceptionFieldNullOrUndefined(
      Org.org_status,
      "org status is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.cnae_main_code,
      "cnae main code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.open_date,
      "open date is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.password,
      "password is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      Org.fantasy_name.trim(),
      "fantasy name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.corporate_name.trim(),
      "corporate name can not be empty"
    );
    err.exceptionFieldIsEmpty(Org.cnpj.trim(), "cnpj can not be empty");
    err.exceptionFieldIsEmpty(
      Org.org_status.trim(),
      "org status can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.cnae_main_code.trim(),
      "cnae main code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.open_date.trim(),
      "open date can not be empty"
    );
    err.exceptionFieldIsEmpty(Org.password.trim(), "password can not be empty");

    err.exceptionFieldValueLessToType(
      Org.password.trim(),
      "password must be greather than 4"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;

  let cnpjExistsOnHttpResquest: any = "";

  try {
    cnpjExistsOnHttpResquest = await axios.get(url);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error to try verify cnpj",
    });
  }

  if (cnpjExistsOnHttpResquest.data.error)
    return res.status(404).json({
      error: "cnpj not found",
    });

  const verifyCnpj = new OrgService();

  const cnpjExixtsOnDb = await verifyCnpj.verifyCnpj(Org.cnpj);

  if (cnpjExixtsOnDb === true)
    return res.status(400).json({
      error: "cnpj already exists",
    });

  try {
    Org.fantasy_name = cryptography.encrypt(Org.fantasy_name);
    Org.corporate_name = cryptography.encrypt(Org.corporate_name);
    Org.cnpj = cryptography.encrypt(Org.cnpj);
    Org.org_status = cryptography.encrypt(Org.org_status);
    Org.cnae_main_code = cryptography.encrypt(Org.cnae_main_code);
    Org.open_date = cryptography.encrypt(Org.open_date);

    Org.password = cryptography.hash(Org.password);

    const orgService = new OrgService(
      Org.fantasy_name,
      Org.corporate_name,
      Org.cnpj,
      Org.org_status,
      Org.cnae_main_code,
      Org.open_date,
      Org.password
    );

    await orgService.save();

    return res.status(201).json({ msg: "organization created" });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/update/:id").put(async (req, res) => {
  const Org = { ...req.body };

  const cryptography = new Cryptography();

  try {
    err.exceptionFieldNullOrUndefined(
      Org.fantasy_name,
      "fantasy name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.corporate_name,
      "corporate name is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(Org.cnpj, "cnpj is undefined or null");
    err.exceptionFieldNullOrUndefined(
      Org.org_status,
      "org status is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.cnae_main_code,
      "cnae main code is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.open_date,
      "open date is undefined or null"
    );
    err.exceptionFieldNullOrUndefined(
      Org.password,
      "password is undefined or null"
    );

    err.exceptionFieldIsEmpty(
      Org.fantasy_name.trim(),
      "fantasy name can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.corporate_name.trim(),
      "corporate name can not be empty"
    );
    err.exceptionFieldIsEmpty(Org.cnpj.trim(), "cnpj can not be empty");
    err.exceptionFieldIsEmpty(
      Org.org_status.trim(),
      "org status can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.cnae_main_code.trim(),
      "cnae main code can not be empty"
    );
    err.exceptionFieldIsEmpty(
      Org.open_date.trim(),
      "open date can not be empty"
    );
    err.exceptionFieldIsEmpty(Org.password.trim(), "password can not be empty");

    err.exceptionFieldValueLessToType(
      Org.password.trim(),
      "password must be greather than 4"
    );
  } catch (e) {
    return res.status(400).json({ error: e });
  }

  const verifyId = new OrgService();

  const orgIdExistsOnDb = await verifyId.verifyId(req.params.id);

  if (orgIdExistsOnDb === false)
    return res.status(404).json({
      error: "organization not found",
    });

  try {
    Org.fantasy_name = cryptography.encrypt(Org.fantasy_name);
    Org.corporate_name = cryptography.encrypt(Org.corporate_name);
    Org.cnpj = cryptography.encrypt(Org.cnpj);
    Org.org_status = cryptography.encrypt(Org.org_status);
    Org.cnae_main_code = cryptography.encrypt(Org.cnae_main_code);
    Org.open_date = cryptography.encrypt(Org.open_date);

    Org.password = cryptography.hash(Org.password);

    const orgService = new OrgService(
      Org.fantasy_name,
      Org.corporate_name,
      Org.cnpj,
      Org.org_status,
      Org.cnae_main_code,
      Org.open_date,
      Org.password
    );

    await orgService.update(req.params.id);

    return res.status(201).json({
      msg: "organization updated",
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/get-all").get(async (req, res) => {
  const orgService = new OrgService();

  const cache = new RedisOperations();

  try {
    const orgFromCache = await cache.getCache(`org`);

    if (orgFromCache) {
      const data = JSON.parse(orgFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgService.getAll();

    if (data === "no data") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`org`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/get-by-id/:id").get(async (req, res) => {
  const Org = { ...req.params };

  const orgService = new OrgService();

  const cache = new RedisOperations();

  try {
    const orgFromCache = await cache.getCache(`org_${Org.id}`);

    if (orgFromCache) {
      const data = JSON.parse(orgFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgService.getById(Org.id);

    if (data === "org not found") {
      return res.status(404).json({
        error: data,
      });
    }

    await cache.setCache(`org_${Org.id}`, JSON.stringify(data), 300);

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/delete/all").delete(async (req, res) => {
  const orgService = new OrgService();

  try {
    const data = await orgService.getAll();

    if (data === "no data")
      return res.status(404).json({
        error: data,
      });

    await orgService.deleteAll();

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

orgController.route("/org/delete-by-id/:id").delete(async (req, res) => {
  const Org = { ...req.params };

  const orgService = new OrgService();

  try {
    const verifyId = await orgService.verifyId(Org.id);

    if (verifyId === false)
      return res.status(404).json({
        error: "organization not found",
      });

    await orgService.deleteById(Org.id);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server",
    });
  }
});

export { orgController };
