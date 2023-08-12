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
exports.driverAddressController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const driverAddressService_1 = __importDefault(require("../../services/driver/driverAddressService"));
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
dotenv.config();
const driverAddressController = express_1.default.Router();
exports.driverAddressController = driverAddressController;
const err = new handleError_1.default();
driverAddressController.route('/org/driver/address/search/zip-code').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.query);
    if (!DriverAddress.ZipCode)
        return res.status(400).json({ error: 'query params required' });
    try {
        const url = `${process.env.CEP_API_URL_BASE}/api/cep/v2/{DriverAddress.ZipCode}`;
        const verifyZipCode = new driverAddressService_1.default();
        const getZipCode = yield verifyZipCode.getZipCode(axios_1.default, url);
        return res.status(200).json(getZipCode);
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
driverAddressController.route('/org/driver/address/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(DriverAddress.state, 'state is undefined or null');
        err.exceptionFieldNullOrUndefined(DriverAddress.city, 'city is undefined or null');
        err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(DriverAddress.state.trim(), 'state can not be empty');
        err.exceptionFieldIsEmpty(DriverAddress.city.trim(), 'city can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const driverAddressService = new driverAddressService_1.default(DriverAddress.zip_code, DriverAddress.state, DriverAddress.city);
        yield driverAddressService.save();
        return res.status(201).json({ msg: 'driver address saved' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(DriverAddress.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(DriverAddress.state, 'state is undefined or null');
        err.exceptionFieldNullOrUndefined(DriverAddress.city, 'city is undefined or null');
        err.exceptionFieldIsEmpty(DriverAddress.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(DriverAddress.state.trim(), 'state can not be empty');
        err.exceptionFieldIsEmpty(DriverAddress.city.trim(), 'city can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverAddressIdExistsOnDb = yield new driverAddressService_1.default()
        .verifyId(req.params.id);
    if (driverAddressIdExistsOnDb === false)
        return res.status(404)
            .json({
            error: 'driver not found'
        });
    try {
        const driverAddressService = new driverAddressService_1.default(DriverAddress.zip_code, DriverAddress.state, DriverAddress.city);
        yield driverAddressService.update(req.params.id);
        return res.status(201).json({ msg: 'driver address updated' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAddressService = new driverAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        cache.connection();
        const driverAddressFromCache = yield cache.getCache(`driverAddress`);
        if (driverAddressFromCache) {
            const data = JSON.parse(driverAddressFromCache);
            res.status(200).json({
                data: { inCache: 'yes', data }
            });
            yield cache.disconnection();
            return;
        }
        const data = yield driverAddressService.getAll();
        if (data.length === 0) {
            res.status(404).json({
                error: 'no data'
            });
            yield cache.disconnection();
            return;
        }
        yield cache.setCache(`driverAddress`, JSON.stringify(data), 300);
        res.status(200).json({
            data: { inCache: 'no', data }
        });
        yield cache.disconnection();
        return;
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.params);
    const driverAddressService = new driverAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        cache.connection();
        const driverAddressFromCache = yield cache.getCache(`driverAddress_${DriverAddress.id}`);
        if (driverAddressFromCache) {
            const data = JSON.parse(driverAddressFromCache);
            res.status(200).json({
                data: { inCache: 'yes', data }
            });
            yield cache.disconnection();
            return;
        }
        const data = yield driverAddressService.getById(DriverAddress.id);
        if (data.length === 0) {
            res.status(404).json({
                error: 'driver address not found'
            });
            yield cache.disconnection();
            return;
        }
        yield cache.setCache(`driverAddress_${DriverAddress.id}`, JSON.stringify(data), 300);
        res.status(200).json({
            data: { inCache: 'no', data }
        });
        yield cache.disconnection();
        return;
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
driverAddressController.route('/org/driver/address/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAddressService = new driverAddressService_1.default();
    try {
        const driverAddressExistsOrNotExists = yield driverAddressService.getAll();
        if (driverAddressExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverAddressService.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverAddress = Object.assign({}, req.params);
    const driverAddressService = new driverAddressService_1.default();
    try {
        const driverExistsOrNotExists = yield driverAddressService.getById(DriverAddress.id);
        if (driverExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver address not found'
            });
        yield driverAddressService.deleteById(DriverAddress.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
