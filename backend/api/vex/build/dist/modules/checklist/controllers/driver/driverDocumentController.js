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
exports.deleteDriverDocumentById = exports.deleteAllDriverDocument = exports.getDriverDocumentById = exports.getDriverDocument = exports.updateDriverDocument = exports.saveDriverDocument = void 0;
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const driverDocumentService_1 = __importDefault(require("../../services/driver/driverDocumentService"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const err = new handleError_1.default();
const saveDriverDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverDocument = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverDocument.cnh, "document is undefined or null");
        err.exceptionFieldIsEmpty(DriverDocument.cnh.trim(), "document can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverDocumentExistsOrNotExists = yield new driverDocumentService_1.default().verifyDocument(DriverDocument.cnh);
    if (driverDocumentExistsOrNotExists === true)
        return res.status(400).json({
            error: "driver document already exists",
        });
    try {
        DriverDocument.cnh = cryptography.encrypt(DriverDocument.cnh);
        const driverDocumentService = new driverDocumentService_1.default(DriverDocument.cnh);
        yield driverDocumentService.save();
        const driverDocumentFromCache = yield cache.getCache(`driverDocument`);
        if (driverDocumentFromCache)
            yield cache.deleteCache("driverDocument");
        return res.status(201).json({ msg: "driver document saved" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.saveDriverDocument = saveDriverDocument;
const updateDriverDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverDocument = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(DriverDocument.cnh, "document is undefined or null");
        err.exceptionFieldIsEmpty(DriverDocument.cnh.trim(), "document can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverDocumentExistsOrNotExists = yield new driverDocumentService_1.default().verifyId(req.params.id);
    if (driverDocumentExistsOrNotExists === false)
        return res.status(404).json({
            error: "driver document not found",
        });
    try {
        DriverDocument.cnh = cryptography.encrypt(DriverDocument.cnh);
        const driverDocumentService = new driverDocumentService_1.default(DriverDocument.cnh);
        yield driverDocumentService.update(req.params.id);
        const driverDocumentFromCache = yield cache.getCache(`driverDocument`);
        if (driverDocumentFromCache)
            yield cache.deleteCache("driverDocument");
        const driverDocumentFromCacheById = yield cache.getCache(`driverDocument_${req.params.id}`);
        if (driverDocumentFromCacheById)
            yield cache.deleteCache(`driverDocument_${req.params.id}`);
        return res.status(201).json({ msg: "driver document updated" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.updateDriverDocument = updateDriverDocument;
const getDriverDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverDocument = Object.assign({}, req.query);
    const driverDocumentService = new driverDocumentService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverDocumentFromCache = yield cache.getCache(`driverDocument`);
        if (driverDocumentFromCache) {
            const data = JSON.parse(driverDocumentFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverDocumentService.getAll(DriverDocument.page, DriverDocument.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverDocument`, JSON.stringify(data), 300);
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
exports.getDriverDocument = getDriverDocument;
const getDriverDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverDocument = Object.assign({}, req.params);
    const driverDocumentService = new driverDocumentService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const driverDocumentFromCache = yield cache.getCache(`driverDocument_${DriverDocument.id}`);
        if (driverDocumentFromCache) {
            const data = JSON.parse(driverDocumentFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield driverDocumentService.getById(DriverDocument.id);
        if (data === "driver document not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`driverDocument_${DriverDocument.id}`, JSON.stringify(data), 300);
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
exports.getDriverDocumentById = getDriverDocumentById;
const deleteAllDriverDocument = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverDocumentService = new driverDocumentService_1.default();
        const cache = new redis_cache_operation_1.default();
        const driverDocumentExistsOrNotExists = yield driverDocumentService.getAll();
        if (driverDocumentExistsOrNotExists === "no data")
            return res.status(404).json({
                error: driverDocumentExistsOrNotExists,
            });
        const allDriverDocument = yield driverDocumentService.getAll();
        for (let id in allDriverDocument) {
            const driverDocumentId = allDriverDocument[id].driver_document_id;
            const driverDocumentFromCacheById = yield cache.getCache(`driverDocument_${driverDocumentId}`);
            if (driverDocumentFromCacheById)
                yield cache.deleteCache(`driverDocument_${driverDocumentId}`);
        }
        yield driverDocumentService.deleteAll();
        const driverDocumentFromCache = yield cache.getCache(`driverDocument`);
        if (driverDocumentFromCache)
            yield cache.deleteCache("driverDocument");
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteAllDriverDocument = deleteAllDriverDocument;
const deleteDriverDocumentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverDocument = Object.assign({}, req.params);
    const cache = new redis_cache_operation_1.default();
    const driverDocumentService = new driverDocumentService_1.default();
    try {
        const driverDocumentExistsOrNotExists = yield driverDocumentService.getById(DriverDocument.id);
        if (driverDocumentExistsOrNotExists === "driver document not found")
            return res.status(404).json({
                error: driverDocumentExistsOrNotExists,
            });
        yield driverDocumentService.deleteById(DriverDocument.id);
        const driverDocumentFromCache = yield cache.getCache(`driverDocument`);
        if (driverDocumentFromCache)
            yield cache.deleteCache("driverDocument");
        const driverDocumentFromCacheById = yield cache.getCache(`driverDocument_${DriverDocument.id}`);
        if (driverDocumentFromCacheById)
            yield cache.deleteCache(`driverDocument_${DriverDocument.id}`);
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteDriverDocumentById = deleteDriverDocumentById;
