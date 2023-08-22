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
exports.orgIpDataProviderController = void 0;
const express_1 = __importDefault(require("express"));
const OrgIpDataProviderService_1 = __importDefault(require("../../services/org/OrgIpDataProviderService"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const dotenv = __importStar(require("dotenv"));
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
dotenv.config();
const orgIpDataProviderController = express_1.default.Router();
exports.orgIpDataProviderController = orgIpDataProviderController;
const err = new handleError_1.default();
orgIpDataProviderController
    .route("/org/client/machine/data/provider/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgMachineAndDataProvider = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.ip, "ip is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.hostname, "hostname is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.city, "city is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.region, "region is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.country, "country is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.loc, "loc data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.org, "org data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.postal, "postal data undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.timezone, "timezone undefined or null");
        err.exceptionFieldNullOrUndefined(OrgMachineAndDataProvider.readme, "readme undefined or null");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.ip.trim(), "ip can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.hostname.trim(), "hostname can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.city.trim(), "city can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.region.trim(), "region can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.country.trim(), "country can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.loc.trim(), "loc can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.org.trim(), "org can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.postal.trim(), "postal can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.timezone.trim(), "timezone can not be empty");
        err.exceptionFieldIsEmpty(OrgMachineAndDataProvider.readme.trim(), "readme can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        OrgMachineAndDataProvider.ip = cryptography.encrypt(OrgMachineAndDataProvider.ip);
        OrgMachineAndDataProvider.hostname = cryptography.encrypt(OrgMachineAndDataProvider.hostname);
        OrgMachineAndDataProvider.city = cryptography.encrypt(OrgMachineAndDataProvider.city);
        OrgMachineAndDataProvider.region = cryptography.encrypt(OrgMachineAndDataProvider.region);
        OrgMachineAndDataProvider.country = cryptography.encrypt(OrgMachineAndDataProvider.country);
        OrgMachineAndDataProvider.loc = cryptography.encrypt(OrgMachineAndDataProvider.loc);
        OrgMachineAndDataProvider.org = cryptography.encrypt(OrgMachineAndDataProvider.org);
        OrgMachineAndDataProvider.postal = cryptography.encrypt(OrgMachineAndDataProvider.postal);
        OrgMachineAndDataProvider.timezone = cryptography.encrypt(OrgMachineAndDataProvider.timezone);
        OrgMachineAndDataProvider.readme = cryptography.encrypt(OrgMachineAndDataProvider.readme);
        new OrgIpDataProviderService_1.default(OrgMachineAndDataProvider.ip, OrgMachineAndDataProvider.hostname, OrgMachineAndDataProvider.city, OrgMachineAndDataProvider.region, OrgMachineAndDataProvider.country, OrgMachineAndDataProvider.loc, OrgMachineAndDataProvider.org, OrgMachineAndDataProvider.postal, OrgMachineAndDataProvider.timezone, OrgMachineAndDataProvider.readme).save();
        return res.status(201).json({
            data: "organization data machine and provider saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgIpDataProviderController
    .route("/org/client/machine/data/provider/get/all")
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
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgIpDataProviderController
    .route("/org/client/machine/data/provider/get/by/id/:id")
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
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgIpDataProviderController
    .route("/org/client/machine/data/provider/delete/by/id/:id")
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
            error: "i am sorry, there is an error with server",
        });
    }
}));
