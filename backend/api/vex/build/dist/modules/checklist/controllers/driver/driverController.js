"use strict";
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
exports.deleteDriverById = exports.deleteAllDriver = exports.getDriverById = exports.getDriver = exports.updateDriver = exports.saveDriver = void 0;
const driverService_1 = __importDefault(require("../../services/driver/driverService"));
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const err = new handleError_1.default();
const saveDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
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
    const emailIdExistsOnDb = yield new driverService_1.default().verifyEmail(Driver.email);
    if (emailIdExistsOnDb === true)
        return res.status(400).json({
            error: "email already exists",
        });
    try {
        Driver.first_name = cryptography.encrypt(Driver.first_name);
        Driver.last_name = cryptography.encrypt(Driver.last_name);
        Driver.email = cryptography.encrypt(Driver.email);
        Driver.password = cryptography.hash(Driver.password);
        const driverService = new driverService_1.default(Driver.first_name, Driver.last_name, Driver.email, Driver.password);
        yield driverService.save();
        const driverFromCache = yield cache.getCache(`driver`);
        if (driverFromCache)
            yield cache.deleteCache("driver");
        return res.status(201).json({ msg: "driver saved" });
    }
    catch (e) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.saveDriver = saveDriver;
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
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
    //verificar se ao atualizar o email já existe e tratar, pois está retornando 500
    const driverIdExistsOnDb = yield new driverService_1.default().verifyId(req.params.id);
    if (driverIdExistsOnDb === false)
        return res.status(404).json({
            error: "driver not found",
        });
    try {
        Driver.first_name = cryptography.encrypt(Driver.first_name);
        Driver.last_name = cryptography.encrypt(Driver.last_name);
        Driver.email = cryptography.encrypt(Driver.email);
        Driver.password = cryptography.hash(Driver.password);
        const driverService = new driverService_1.default(Driver.first_name, Driver.last_name, Driver.email, Driver.password);
        yield driverService.update(req.params.id);
        const driverFromCache = yield cache.getCache(`driver`);
        if (driverFromCache)
            yield cache.deleteCache("driver");
        const driverFromCacheById = yield cache.getCache(`driver_${req.params.id}`);
        if (driverFromCacheById)
            yield cache.deleteCache(`driver_${req.params.id}`);
        return res.status(201).json({ msg: "driver updated" });
    }
    catch (e) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.updateDriver = updateDriver;
const getDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.query);
    const driverService = new driverService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverFromCache = yield cache.getCache(`driver`);
        if (driverFromCache) {
            const data = JSON.parse(driverFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverService.getAll(Driver.page, Driver.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driver`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (e) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.getDriver = getDriver;
const getDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    const driverService = new driverService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverFromCache = yield cache.getCache(`driver_${Driver.id}`);
        if (driverFromCache) {
            const data = JSON.parse(driverFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverService.getById(Driver.id);
        if (data === "driver not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driver_${Driver.id}`, JSON.stringify(data), 300);
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
exports.getDriverById = getDriverById;
const deleteAllDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverService = new driverService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverIdExistsOnDb = yield driverService.getAll();
        if (driverIdExistsOnDb === "no data")
            return res.status(404).json({
                error: driverIdExistsOnDb,
            });
        //código para deletar também todas as keys por id
        const allDrivers = yield driverService.getAll();
        for (let id in allDrivers) {
            const driverId = allDrivers[id].driver_id;
            const driverFromCacheById = yield cache.getCache(`driver_${driverId}`);
            if (driverFromCacheById)
                yield cache.deleteCache(`driver_${driverId}`);
        }
        yield driverService.deleteAll();
        const driverFromCache = yield cache.getCache(`driver`);
        if (driverFromCache)
            yield cache.deleteCache("driver");
        return res.status(204).json({});
    }
    catch (e) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteAllDriver = deleteAllDriver;
const deleteDriverById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverService = new driverService_1.default();
    const cache = new redis_cache_operation_1.default();
    const Driver = Object.assign({}, req.params);
    try {
        const driverIdExistsOnDb = yield driverService.getById(Driver.id);
        if (driverIdExistsOnDb === "driver not found")
            return res.status(404).json({
                error: driverIdExistsOnDb,
            });
        yield driverService.deleteById(Driver.id);
        const driverFromCache = yield cache.getCache(`driver`);
        if (driverFromCache)
            yield cache.deleteCache("driver");
        const driverFromCacheById = yield cache.getCache(`driver_${Driver.id}`);
        if (driverFromCacheById)
            yield cache.deleteCache(`driver_${Driver.id}`);
        return res.status(204).json({});
    }
    catch (e) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteDriverById = deleteDriverById;
