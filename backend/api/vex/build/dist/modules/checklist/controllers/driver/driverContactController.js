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
exports.deleteDriverContactById = exports.deleteAllDriverContact = exports.getDriverContactById = exports.getDriverContact = exports.updateDriverContact = exports.saveDriverContact = void 0;
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const driverContactService_1 = __importDefault(require("../../services/driver/driverContactService"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const err = new handleError_1.default();
const saveDriverContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverContact.telephone, "telephone is undefined or null");
        err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), "telephone can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        DriverContact.telephone = cryptography.encrypt(DriverContact.telephone);
        const driverContactService = new driverContactService_1.default(DriverContact.telephone);
        yield driverContactService.save();
        const driverContactFromCache = yield cache.getCache(`driverContact`);
        if (driverContactFromCache)
            yield cache.deleteCache("driverContact");
        return res.status(201).json({ msg: "driver telephone save" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.saveDriverContact = saveDriverContact;
const updateDriverContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverContact.telephone, "telephone is undefined or null");
        err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), "telephone can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverTelephoneExistsOrNotExists = yield new driverContactService_1.default().verifyId(req.params.id);
    if (driverTelephoneExistsOrNotExists === false)
        return res.status(404).json({
            error: "driver telephone not found",
        });
    try {
        DriverContact.telephone = cryptography.encrypt(DriverContact.telephone);
        const driverContactService = new driverContactService_1.default(DriverContact.telephone);
        yield driverContactService.update(req.params.id);
        const driverContactFromCache = yield cache.getCache(`driverContact`);
        if (driverContactFromCache)
            yield cache.deleteCache("driverContact");
        const driverContactFromCacheById = yield cache.getCache(`driverContact_${req.params.id}`);
        if (driverContactFromCacheById)
            yield cache.deleteCache(`driverContact_${req.params.id}`);
        return res.status(201).json({ msg: "driver telephone update" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.updateDriverContact = updateDriverContact;
const getDriverContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.query);
    const driverContactService = new driverContactService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverContactFromCache = yield cache.getCache(`driverContact`);
        if (driverContactFromCache) {
            const data = JSON.parse(driverContactFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverContactService.getAll(DriverContact.page, DriverContact.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverContact`, JSON.stringify(data), 300);
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
exports.getDriverContact = getDriverContact;
const getDriverContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.params);
    const driverContactService = new driverContactService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverContactFromCache = yield cache.getCache(`driverContact_${DriverContact.id}`);
        if (driverContactFromCache) {
            const data = JSON.parse(driverContactFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverContactService.getById(DriverContact.id);
        if (data === "driver contact not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverContact_${DriverContact.id}`, JSON.stringify(data), 300);
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
exports.getDriverContactById = getDriverContactById;
const deleteAllDriverContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverContactService = new driverContactService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverContactExistsOrNotExists = yield driverContactService.getAll();
        if (driverContactExistsOrNotExists === "no data")
            return res.status(404).json({
                error: driverContactExistsOrNotExists,
            });
        const allDriverContact = yield driverContactService.getAll();
        for (let id in allDriverContact) {
            const driverContactId = allDriverContact[id].driver_id;
            const driverContactFromCacheById = yield cache.getCache(`driverContact_${driverContactId}`);
            if (driverContactFromCacheById)
                yield cache.deleteCache(`driverContact_${driverContactId}`);
        }
        yield driverContactService.deleteAll();
        const driverContactFromCache = yield cache.getCache(`driverContact`);
        if (driverContactFromCache)
            yield cache.deleteCache("driverContact");
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteAllDriverContact = deleteAllDriverContact;
const deleteDriverContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.params);
    const cache = new redis_cache_operation_1.default();
    const driverContactService = new driverContactService_1.default();
    try {
        const driverExistsOrNotExists = yield driverContactService.getById(DriverContact.id);
        if (driverExistsOrNotExists === "driver contact not found")
            return res.status(404).json({
                error: driverExistsOrNotExists,
            });
        yield driverContactService.deleteById(DriverContact.id);
        const driverContactFromCache = yield cache.getCache(`driverContact`);
        if (driverContactFromCache)
            yield cache.deleteCache("driverContact");
        const driverContactFromCacheById = yield cache.getCache(`driverContact_${DriverContact.id}`);
        if (driverContactFromCacheById)
            yield cache.deleteCache(`driverContact_${DriverContact.id}`);
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteDriverContactById = deleteDriverContactById;
