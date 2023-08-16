import express from "express";

import HandleError from "../../../interface/error/handleError";

import * as dotenv from "dotenv";

import { loadDataTest, loadDataTest2 } from "../../request/request.test";
import { getCache, setCache } from "../../cache/redis";

import OrgJoinQuery from "../../../services/query/orgJoinQueryService";
import {
  cipherDriverDataAndSave,
  cipherDriverDataAndUpdate,
  cipherOrgDataAndSave,
  cipherOrgDataAndUpdate,
  decipherDriverDataAndGet,
  decipherDriverDataByIdAndGet,
  decipherOrgDataAndGet,
  decipherOrgDataByIdAndGet,
  deleteAllCiphedDriver,
  deleteAllCiphedOrg,
  deleteByIdCiphedDriver,
  deleteByIdCiphedOrg,
  verifyDeciphedCnpj,
  verifyDeciphedCnpjAndGetData,
  verifyDeciphedEmail,
  verifyDeciphedEmailAndGetData,
} from "../../security/crypto";
import axios from "axios";
import OrgService from "../../../services/org/orgService";

dotenv.config();

const orgTestsController = express.Router();

const err = new HandleError();

//testes de cargas/stress
orgTestsController
  .route("/tests/org/information/stress")
  .get(async (req, res) => {
    try {
      // 60  requisições/s direto do banco de dados [gravação e leitura]
      const request = loadDataTest();

      console.log(request);

      const request2 = loadDataTest2();

      console.log(request2);

      return res
        .status(200)
        .json({ tests: "testing start Ok! looking in your bash terminal!" });
    } catch (__) {
      return res.status(500).json({ error: "ops! there is an error" + __ });
    }
  });

// testes de performance com cache utilizando o db redis
orgTestsController
  .route("/tests/redis-cache/on-storage")
  .post(async (req, res) => {
    try {
      await setCache(req.body.key, req.body.value, req.body.expiration);

      return res.status(201).json({ msg: "cache on storage" });
    } catch (__) {
      return res.status(500).json({ error: "ops! there is an error" + __ });
    }
  })
  .get(async (req, res) => {
    try {
      const cache = await getCache(req.query.cache);

      return res.status(200).json(cache);
    } catch (__) {
      return res.status(500).json({ error: "ops! there is an error" + __ });
    }
  });

orgTestsController
  .route("/tests/redis-cache/get/org/data/:id")
  .get(async (req, res) => {
    try {
      const orgDataFromCache = await getCache(`org_data_${req.params.id}`);

      if (orgDataFromCache) {
        const data = JSON.parse(orgDataFromCache);

        return res.status(200).json({
          data: {
            inCache: "yes",
            data,
          },
        });
      }

      const query = new OrgJoinQuery();

      const data = await query.getById(Number(req.params.id));

      if (data.data.organization.length === 0) {
        return res.status(404).json({
          msg: "no data",
        });
      }

      // 60 * 60 * 24 * 7 (expiration: 7 dias)
      //a lógica é a seguinte: a informação será salva,
      // na api de registro, no database de registro e no banco de cache
      // o usuário de nível gratuito, somente acessará os dados em cache,
      // com ttl equivalente a 1 semana, após isso os dados em cache serão
      // eliminados e a API de registro somente será acessível a administração
      // do app, para fins de consulta ou jurídico, será eliminar primeiro a
      // associação da informação e logo após a informação, ambos estarão
      // em cache
      await setCache(`org_data_${req.params.id}`, JSON.stringify(data), 300);

      // neste ponto a tentativa de parse levaria a erros continuos,
      // pois aqui o valor da value de informationFromCache é null
      // e a tentativa de parse para JSON, seria o mesmo que
      // converter um valor null em JSON.
      // então se na chamada não houver dados em cache,
      // os dados obtidos na requisição REST serão salvos no redis e
      // apresentados ao usuário, na próxima chamada o valor já será
      // diferente de null, aí sim poderá ser parseado para JSON
      // e obtido do banco de dados de cache.

      return res.status(200).json({
        data: {
          inCache: "no",
          data,
        },
      });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

//testes de operações com dados criptografados

//Org
orgTestsController.route("/tests/org/crypted/save").post(async (req, res) => {
  const Org = { ...req.body };

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
  console.log(url);
  let cnpjExistsOnHttpResquest: any = "";

  try {
    cnpjExistsOnHttpResquest = await axios.get(url);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error to try verify cnpj" + __,
    });
  }

  if (cnpjExistsOnHttpResquest.data.error)
    return res.status(404).json({
      error: "cnpj not found",
    });

  const cnpjExixtsOnDb = await verifyDeciphedCnpj(Org.cnpj);

  if (cnpjExixtsOnDb === true)
    return res.status(400).json({
      error: "cnpj already exists",
    });

  try {
    cipherOrgDataAndSave(Org);

    return res.json({ data: "organization saved and crypted with success" });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/update/:id").put(async (req, res) => {
  const Org = { ...req.body };

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
      error: "i am sorry, there is an error to try verify cnpj" + __,
    });
  }

  if (cnpjExistsOnHttpResquest.data.error)
    return res.status(404).json({
      error: "cnpj not found",
    });

  try {
    const response = await cipherOrgDataAndUpdate(req.params.id, Org);

    return res.json(response);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/verify").get(async (req, res) => {
  const Org = { ...req.query };

  try {
    const response = await verifyDeciphedCnpj(Org.cnpj);

    return res.json(response);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/crypted/data").get(async (req, res) => {
  try {
    const data = await decipherOrgDataAndGet();

    return res.json(data);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/cnpj/verify").get(async (req, res) => {
  const Org = { ...req.query };

  try {
    const cnpjExistsOrNotexists = await verifyDeciphedCnpjAndGetData(Org.cnpj);

    return res.json(cnpjExistsOrNotexists);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/get/by/id/:id").get(async (req, res) => {
  const Org = { ...req.params };

  try {
    const response = await decipherOrgDataByIdAndGet(Org.id);

    if (response === "org not found") return res.status(404).json(response);

    return res.json(response);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController.route("/tests/org/delete/all").delete(async (req, res) => {
  try {
    const response = await deleteAllCiphedOrg();

    if (response === "no data") return res.status(404).json(response);

    return res.status(204).json();
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController
  .route("/tests/org/delete/by/id/:id")
  .delete(async (req, res) => {
    try {
      const response = await deleteByIdCiphedOrg(req.params.id);

      if (response === "organization not found")
        return res.status(404).json(response);

      return res.status(204).json();
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

//Driver
orgTestsController
  .route("/tests/org/driver/crypted/save")
  .post(async (req, res) => {
    const Driver = { ...req.body };

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

    const emailIdExistsOnDb = await verifyDeciphedEmail(Driver.email);

    if (emailIdExistsOnDb === true)
      return res.status(400).json({
        error: "email already exists",
      });

    try {
      cipherDriverDataAndSave(Driver);

      return res.json({ data: "driver saved and crypted with success" });
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

orgTestsController
  .route("/tests/org/driver/update/:id")
  .put(async (req, res) => {
    const Driver = { ...req.body };

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

    try {
      const response = await cipherDriverDataAndUpdate(req.params.id, Driver);

      return res.json(response);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

orgTestsController
  .route("/tests/org/driver/crypted/data")
  .get(async (req, res) => {
    try {
      const data = await decipherDriverDataAndGet();

      return res.json(data);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

orgTestsController
  .route("/tests/org/driver/email/verify")
  .get(async (req, res) => {
    const Driver = { ...req.query };

    try {
      const emailExistsOrNotexists = await verifyDeciphedEmailAndGetData(
        Driver.email
      );

      return res.json(emailExistsOrNotexists);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

orgTestsController.route("/tests/org/driver/verify").get(async (req, res) => {
  const Driver = { ...req.query };

  try {
    const response = await verifyDeciphedEmail(Driver.email);

    return res.json(response);
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server" + __,
    });
  }
});

orgTestsController
  .route("/tests/org/driver/get/by/id/:id")
  .get(async (req, res) => {
    const Driver = { ...req.params };

    try {
      const response = await decipherDriverDataByIdAndGet(Driver.id);

      if (response === "driver not found")
        return res.status(404).json(response);

      return res.json(response);
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });

  orgTestsController.route("/tests/org/driver/delete/all").delete(async (req, res) => {
    try {
      const response = await deleteAllCiphedDriver();
  
      if (response === "no data") return res.status(404).json(response);
  
      return res.status(204).json();
    } catch (__) {
      return res.status(500).json({
        error: "i am sorry, there is an error with server" + __,
      });
    }
  });
  
  orgTestsController
    .route("/tests/org/driver/delete/by/id/:id")
    .delete(async (req, res) => {
      try {
        const response = await deleteByIdCiphedDriver(req.params.id);
  
        if (response === "driver not found")
          return res.status(404).json(response);
  
        return res.status(204).json();
      } catch (__) {
        return res.status(500).json({
          error: "i am sorry, there is an error with server" + __,
        });
      }
    });

export { orgTestsController };
