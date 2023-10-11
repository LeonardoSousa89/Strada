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
exports.deleteDriverAddressById = exports.deleteAllDriverAddress = exports.getDriverAddressById = exports.getDriverAddress = exports.updateDriverAddress = exports.saveDriverAddress = exports.getZipCode = void 0;
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const driverAddressService_1 = __importDefault(require("../../services/driver/driverAddressService"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
dotenv.config();
const err = new handleError_1.default();
// https://brasilaberto.com/blog/posts/5-melhores-apis-de-cep-2023
const getZipCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.query);
    if (!DriverAddress.ZipCode)
        return res.status(400).json({ error: "query params required" });
    try {
        const zipcode = Number(DriverAddress.ZipCode);
        const url = `${process.env.CEP_API_URL_BASE}/v1/${zipcode}`;
        const verifyZipCode = new driverAddressService_1.default();
        const getZipCode = yield verifyZipCode.getZipCode(axios_1.default, url);
        return res.status(200).json(getZipCode);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error to try verify your zip code" + __,
        });
    }
});
exports.getZipCode = getZipCode;
const saveDriverAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, "zip code is undefined or null");
        err.exceptionFieldNullOrUndefined(DriverAddress.state, "state is undefined or null");
        err.exceptionFieldNullOrUndefined(DriverAddress.city, "city is undefined or null");
        err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), "zip code can not be empty");
        err.exceptionFieldIsEmpty(DriverAddress.state.trim(), "state can not be empty");
        err.exceptionFieldIsEmpty(DriverAddress.city.trim(), "city can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        DriverAddress.zip_code = cryptography.encrypt(DriverAddress.zip_code);
        DriverAddress.state = cryptography.encrypt(DriverAddress.state);
        DriverAddress.city = cryptography.encrypt(DriverAddress.city);
        const driverAddressService = new driverAddressService_1.default(DriverAddress.zip_code, DriverAddress.state, DriverAddress.city);
        yield driverAddressService.save();
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache)
            yield cache.deleteCache("driverAddress");
        return res.status(201).json({ msg: "driver address saved" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.saveDriverAddress = saveDriverAddress;
const updateDriverAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, "zip code is undefined or null");
        err.exceptionFieldNullOrUndefined(DriverAddress.state, "state is undefined or null");
        err.exceptionFieldNullOrUndefined(DriverAddress.city, "city is undefined or null");
        err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), "zip code can not be empty");
        err.exceptionFieldIsEmpty(DriverAddress.state.trim(), "state can not be empty");
        err.exceptionFieldIsEmpty(DriverAddress.city.trim(), "city can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverAddressIdExistsOnDb = yield new driverAddressService_1.default().verifyId(req.params.id);
    if (driverAddressIdExistsOnDb === false)
        return res.status(404).json({
            error: "driver not found",
        });
    try {
        DriverAddress.zip_code = cryptography.encrypt(DriverAddress.zip_code);
        DriverAddress.state = cryptography.encrypt(DriverAddress.state);
        DriverAddress.city = cryptography.encrypt(DriverAddress.city);
        const driverAddressService = new driverAddressService_1.default(DriverAddress.zip_code, DriverAddress.state, DriverAddress.city);
        yield driverAddressService.update(req.params.id);
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache)
            yield cache.deleteCache("driverAddress");
        const driverAddressFromCacheById = yield cache.getCache(`driverAddress_${req.params.id}`);
        if (driverAddressFromCacheById)
            yield cache.deleteCache(`driverAddress_${req.params.id}`);
        return res.status(201).json({ msg: "driver address updated" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.updateDriverAddress = updateDriverAddress;
const getDriverAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.query);
    const driverAddressService = new driverAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache) {
            const data = JSON.parse(driverAddressFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverAddressService.getAll(DriverAddress.page, DriverAddress.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverAddress`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.getDriverAddress = getDriverAddress;
const getDriverAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.params);
    const driverAddressService = new driverAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverAddressFromCache = yield cache.getCache(`driverAddress_${DriverAddress.id}`);
        if (driverAddressFromCache) {
            const data = JSON.parse(driverAddressFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverAddressService.getById(DriverAddress.id);
        if (data === "driver address not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverAddress_${DriverAddress.id}`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.getDriverAddressById = getDriverAddressById;
const deleteAllDriverAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAddressService = new driverAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverAddressExistsOrNotExists = yield driverAddressService.getAll();
        if (driverAddressExistsOrNotExists === "no data")
            return res.status(404).json({
                error: driverAddressExistsOrNotExists,
            });
        const allDriverAddress = yield driverAddressService.getAll();
        for (let id in allDriverAddress) {
            const driverAddressId = allDriverAddress[id].driver_id;
            const driverFromCacheById = yield cache.getCache(`driverAddress_${driverAddressId}`);
            if (driverFromCacheById)
                yield cache.deleteCache(`driverAddress_${driverAddressId}`);
        }
        yield driverAddressService.deleteAll();
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache)
            yield cache.deleteCache("driverAddress");
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteAllDriverAddress = deleteAllDriverAddress;
const deleteDriverAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.params);
    const cache = new redis_cache_operation_1.default();
    const driverAddressService = new driverAddressService_1.default();
    try {
        const driverExistsOrNotExists = yield driverAddressService.getById(DriverAddress.id);
        if (driverExistsOrNotExists === "driver address not found")
            return res.status(404).json({
                error: driverExistsOrNotExists,
            });
        yield driverAddressService.deleteById(DriverAddress.id);
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache)
            yield cache.deleteCache("driverAddress");
        const driverAddressFromCacheById = yield cache.getCache(`driverAddress_${DriverAddress.id}`);
        if (driverAddressFromCacheById)
            yield cache.deleteCache(`driverAddress_${DriverAddress.id}`);
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteDriverAddressById = deleteDriverAddressById;
