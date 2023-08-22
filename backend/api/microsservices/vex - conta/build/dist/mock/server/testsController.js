"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orgTestsController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const dotenv = __importStar(require("dotenv"));
const request_1 = require("../request/request");
const redis_1 = require("../cache/redis");
const orgJoinQueryService_1 = __importDefault(require("../../services/query/orgJoinQueryService"));
const crypto_1 = require("../security/crypto");
const axios_1 = __importDefault(require("axios"));
const information_paginate_1 = require("../request/information.paginate");
const driver_paginate_1 = require("../request/driver.paginate");
const data_ip_1 = require("../request/data.ip");
const time_data_1 = require("../request/time.data");
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
const OrgIpDataProviderService_1 = __importDefault(require("../../services/org/OrgIpDataProviderService"));
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
dotenv.config();
const orgTestsController = express_1.default.Router();
exports.orgTestsController = orgTestsController;
const err = new handleError_1.default();
//testes de cargas/stress
orgTestsController
    .route("/tests/org/information/stress")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 60  requisições/s direto do banco de dados [gravação e leitura]
        const request = (0, request_1.loadDataTest)();
        console.log(request);
        const request2 = (0, request_1.loadDataTest2)();
        console.log(request2);
        return res
            .status(200)
            .json({ tests: "testing start Ok! looking in your bash terminal!" });
    }
    catch (__) {
        return res.status(500).json({ error: "ops! there is an error" + __ });
    }
}));
// testes de performance com cache utilizando o db redis
orgTestsController
    .route("/tests/redis-cache/on-storage")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redis_1.setCache)(req.body.key, req.body.value, req.body.expiration);
        return res.status(201).json({ msg: "cache on storage" });
    }
    catch (__) {
        return res.status(500).json({ error: "ops! there is an error" + __ });
    }
}))
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cache = yield (0, redis_1.getCache)(req.query.cache);
        return res.status(200).json(cache);
    }
    catch (__) {
        return res.status(500).json({ error: "ops! there is an error" + __ });
    }
}));
orgTestsController
    .route("/tests/redis-cache/get/org/data/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orgDataFromCache = yield (0, redis_1.getCache)(`org_data_${req.params.id}`);
        if (orgDataFromCache) {
            const data = JSON.parse(orgDataFromCache);
            return res.status(200).json({
                data: {
                    inCache: "yes",
                    data,
                },
            });
        }
        const query = new orgJoinQueryService_1.default();
        const data = yield query.getById(Number(req.params.id));
        if (data.data.organization.organization.length === 0) {
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
        yield (0, redis_1.setCache)(`org_data_${req.params.id}`, JSON.stringify(data), 300);
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
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
//testes de operações com dados criptografados
//Org
orgTestsController.route("/tests/org/crypted/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.fantasy_name, "fantasy name is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.corporate_name, "corporate name is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.cnpj, "cnpj is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.org_status, "org status is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, "cnae main code is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.open_date, "open date is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.password, "password is undefined or null");
        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), "fantasy name can not be empty");
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), "corporate name can not be empty");
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), "cnpj can not be empty");
        err.exceptionFieldIsEmpty(Org.org_status.trim(), "org status can not be empty");
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), "cnae main code can not be empty");
        err.exceptionFieldIsEmpty(Org.open_date.trim(), "open date can not be empty");
        err.exceptionFieldIsEmpty(Org.password.trim(), "password can not be empty");
        err.exceptionFieldValueLessToType(Org.password.trim(), "password must be greather than 4");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;
    console.log(url);
    let cnpjExistsOnHttpResquest = "";
    try {
        cnpjExistsOnHttpResquest = yield axios_1.default.get(url);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error to try verify cnpj" + __,
        });
    }
    if (cnpjExistsOnHttpResquest.data.error)
        return res.status(404).json({
            error: "cnpj not found",
        });
    const cnpjExixtsOnDb = yield (0, crypto_1.verifyDeciphedCnpj)(Org.cnpj);
    if (cnpjExixtsOnDb === true)
        return res.status(400).json({
            error: "cnpj already exists",
        });
    try {
        (0, crypto_1.cipherOrgDataAndSave)(Org);
        return res.json({ data: "organization saved and crypted with success" });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.fantasy_name, "fantasy name is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.corporate_name, "corporate name is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.cnpj, "cnpj is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.org_status, "org status is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, "cnae main code is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.open_date, "open date is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.password, "password is undefined or null");
        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), "fantasy name can not be empty");
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), "corporate name can not be empty");
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), "cnpj can not be empty");
        err.exceptionFieldIsEmpty(Org.org_status.trim(), "org status can not be empty");
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), "cnae main code can not be empty");
        err.exceptionFieldIsEmpty(Org.open_date.trim(), "open date can not be empty");
        err.exceptionFieldIsEmpty(Org.password.trim(), "password can not be empty");
        err.exceptionFieldValueLessToType(Org.password.trim(), "password must be greather than 4");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;
    let cnpjExistsOnHttpResquest = "";
    try {
        cnpjExistsOnHttpResquest = yield axios_1.default.get(url);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error to try verify cnpj" + __,
        });
    }
    if (cnpjExistsOnHttpResquest.data.error)
        return res.status(404).json({
            error: "cnpj not found",
        });
    try {
        const response = yield (0, crypto_1.cipherOrgDataAndUpdate)(req.params.id, Org);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/verify").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    try {
        const response = yield (0, crypto_1.verifyDeciphedCnpj)(Org.cnpj);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/crypted/data").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, crypto_1.decipherOrgDataAndGet)();
        return res.json(data);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/cnpj/verify").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    try {
        const cnpjExistsOrNotexists = yield (0, crypto_1.verifyDeciphedCnpjAndGetData)(Org.cnpj);
        return res.json(cnpjExistsOrNotexists);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/get/by/id/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    try {
        const response = yield (0, crypto_1.decipherOrgDataByIdAndGet)(Org.id);
        if (response === "org not found")
            return res.status(404).json(response);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/delete/all").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, crypto_1.deleteAllCiphedOrg)();
        if (response === "no data")
            return res.status(404).json(response);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, crypto_1.deleteByIdCiphedOrg)(req.params.id);
        if (response === "organization not found")
            return res.status(404).json(response);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
//Driver
orgTestsController
    .route("/tests/org/driver/crypted/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.first_name, "first name is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.last_name, "last name is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.email, "email place is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.password, "password place is undefined or null");
        err.exceptionFieldIsEmpty(Driver.first_name.trim(), "first name can not be empty");
        err.exceptionFieldIsEmpty(Driver.last_name.trim(), "last name can not be empty");
        err.exceptionFieldIsEmpty(Driver.email.trim(), "email place can not be empty");
        err.exceptionFieldIsEmpty(Driver.password.trim(), "password place can not be empty");
        err.exceptionFieldValueLessToType(Driver.password, "password can not be less than 4");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const emailIdExistsOnDb = yield (0, crypto_1.verifyDeciphedEmail)(Driver.email);
    if (emailIdExistsOnDb === true)
        return res.status(400).json({
            error: "email already exists",
        });
    try {
        (0, crypto_1.cipherDriverDataAndSave)(Driver);
        return res.json({ data: "driver saved and crypted with success" });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/update/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.first_name, "first name is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.last_name, "last name is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.email, "email place is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.password, "password place is undefined or null");
        err.exceptionFieldIsEmpty(Driver.first_name.trim(), "first name can not be empty");
        err.exceptionFieldIsEmpty(Driver.last_name.trim(), "last name can not be empty");
        err.exceptionFieldIsEmpty(Driver.email.trim(), "email place can not be empty");
        err.exceptionFieldIsEmpty(Driver.password.trim(), "password place can not be empty");
        err.exceptionFieldValueLessToType(Driver.password, "password can not be less than 4");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const response = yield (0, crypto_1.cipherDriverDataAndUpdate)(req.params.id, Driver);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/crypted/data")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, crypto_1.decipherDriverDataAndGet)();
        return res.json(data);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/email/verify")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.query);
    try {
        const emailExistsOrNotexists = yield (0, crypto_1.verifyDeciphedEmailAndGetData)(Driver.email);
        return res.json(emailExistsOrNotexists);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController.route("/tests/org/driver/verify").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.query);
    try {
        const response = yield (0, crypto_1.verifyDeciphedEmail)(Driver.email);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    try {
        const response = yield (0, crypto_1.decipherDriverDataByIdAndGet)(Driver.id);
        if (response === "driver not found")
            return res.status(404).json(response);
        return res.json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/delete/all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, crypto_1.deleteAllCiphedDriver)();
        if (response === "no data")
            return res.status(404).json(response);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, crypto_1.deleteByIdCiphedDriver)(req.params.id);
        if (response === "driver not found")
            return res.status(404).json(response);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/information/pagination/get/all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, information_paginate_1.getAllInformation)(req.query.page, req.query.size);
        return res.status(200).json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/driver/pagination/get/all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, driver_paginate_1.getAllDriver)(req.query.page, req.query.size);
        return res.status(200).json(response);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/client/machine/get/data")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ipApiUrl = `http://meuip.com/api/meuip.php`;
        const userIp = yield (0, data_ip_1.ip)(ipApiUrl);
        const geoIpApiUrl = `http://ipinfo.io/${userIp}/json`;
        const ipData = yield (0, data_ip_1.ipDataResponse)(geoIpApiUrl);
        return res.status(200).json({
            data: {
                ipData,
                createdAt: (0, time_data_1.getTime)(),
            },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
//org ip data
orgTestsController
    .route("/tests/org/client/machine/data/provider/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgIpDataProvider = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.ip, "data is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.hostname, "data is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.city, "data is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.region, "data is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.country, "data is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.loc, "data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.org, "data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.postal, "data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.timezone, "data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgIpDataProvider.readme, "data undefined or null");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.ip.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.hostname.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.city.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.region.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.country.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.loc.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.org.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.postal.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.timezone.trim(), "data can not be empty");
        err.exceptionFieldIsEmpty(OrgIpDataProvider.readme.trim(), "data can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        OrgIpDataProvider.ip = cryptography.encrypt(OrgIpDataProvider.ip);
        OrgIpDataProvider.hostname = cryptography.encrypt(OrgIpDataProvider.hostname);
        OrgIpDataProvider.city = cryptography.encrypt(OrgIpDataProvider.city);
        OrgIpDataProvider.region = cryptography.encrypt(OrgIpDataProvider.region);
        OrgIpDataProvider.country = cryptography.encrypt(OrgIpDataProvider.country);
        OrgIpDataProvider.loc = cryptography.encrypt(OrgIpDataProvider.loc);
        OrgIpDataProvider.org = cryptography.encrypt(OrgIpDataProvider.org);
        OrgIpDataProvider.postal = cryptography.encrypt(OrgIpDataProvider.postal);
        OrgIpDataProvider.timezone = cryptography.encrypt(OrgIpDataProvider.timezone);
        OrgIpDataProvider.readme = cryptography.encrypt(OrgIpDataProvider.readme);
        new OrgIpDataProviderService_1.default(OrgIpDataProvider.ip, OrgIpDataProvider.hostname, OrgIpDataProvider.city, OrgIpDataProvider.region, OrgIpDataProvider.country, OrgIpDataProvider.loc, OrgIpDataProvider.org, OrgIpDataProvider.postal, OrgIpDataProvider.timezone, OrgIpDataProvider.readme).save();
        return res.status(201).json({
            data: "organization data machine and provider saved with success",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/client/machine/data/provider/get/all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgIpDataProvider = Object.assign({}, req.query);
    const orgIpDataProviderService = new OrgIpDataProviderService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgIpDataProviderFromCache = yield cache.getCache(`orgIpDataProvider`);
        if (orgIpDataProviderFromCache) {
            const data = JSON.parse(orgIpDataProviderFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgIpDataProviderService.getAll(OrgIpDataProvider.page, OrgIpDataProvider.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgIpDataProvider`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/client/machine/data/provider/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgIpDataProvider = Object.assign({}, req.params);
    const orgIpDataProviderService = new OrgIpDataProviderService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgIpDataProviderFromCache = yield cache.getCache(`orgIpDataProvider_${OrgIpDataProvider.id}`);
        if (orgIpDataProviderFromCache) {
            const data = JSON.parse(orgIpDataProviderFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgIpDataProviderService.getById(OrgIpDataProvider.id);
        if (data === "org not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgIpDataProvider_${OrgIpDataProvider.id}`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
orgTestsController
    .route("/tests/org/client/machine/data/provider/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgIpDataProvider = Object.assign({}, req.params);
    const orgIpDataProviderService = new OrgIpDataProviderService_1.default();
    try {
        const verifyId = yield orgIpDataProviderService.verifyId(OrgIpDataProvider.id);
        if (verifyId === false)
            return res.status(404).json({
                error: "organization not found",
            });
        yield orgIpDataProviderService.deleteById(OrgIpDataProvider.id);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
}));
