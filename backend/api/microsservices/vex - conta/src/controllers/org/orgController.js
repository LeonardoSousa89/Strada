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
exports.orgController = void 0;
const express_1 = __importDefault(require("express"));
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
dotenv.config();
const orgController = express_1.default.Router();
exports.orgController = orgController;
const err = new handleError_1.default();
orgController.route("/org/verify-cnpj").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    const url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;
    try {
        const response = yield axios_1.default.get(url);
        if (response.data.error)
            return res.status(404).json({
                organizationExists: false,
            });
        else
            return res.status(200).json({
                organizationExists: true,
            });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgController.route("/org/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
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
            error: "i am sorry, there is an error to try verify cnpj",
        });
    }
    if (cnpjExistsOnHttpResquest.data.error)
        return res.status(404).json({
            error: "cnpj not found",
        });
    const verifyCnpj = new orgService_1.default();
    const cnpjExixtsOnDb = yield verifyCnpj.verifyCnpj(Org.cnpj);
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
        const orgService = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password);
        yield orgService.save();
        return res.status(201).json({ msg: "organization created" });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgController.route("/org/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
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
    const verifyId = new orgService_1.default();
    const orgIdExistsOnDb = yield verifyId.verifyId(req.params.id);
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
        const orgService = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password);
        yield orgService.update(req.params.id);
        return res.status(201).json({
            msg: "organization updated",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgController.route("/org/get-all").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    const orgService = new orgService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgFromCache = yield cache.getCache(`org`);
        if (orgFromCache) {
            const data = JSON.parse(orgFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgService.getAll(Org.page, Org.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`org`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgController.route("/org/get-by-id/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    const orgService = new orgService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgFromCache = yield cache.getCache(`org_${Org.id}`);
        if (orgFromCache) {
            const data = JSON.parse(orgFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgService.getById(Org.id);
        if (data === "org not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`org_${Org.id}`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgController.route("/org/delete-by-id/:id").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    const orgService = new orgService_1.default();
    try {
        const verifyId = yield orgService.verifyId(Org.id);
        if (verifyId === false)
            return res.status(404).json({
                error: "organization not found",
            });
        yield orgService.deleteById(Org.id);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
