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
exports.midiaController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const redis_cache_operation_1 = __importDefault(require("../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../config/security/cryptography"));
const midiaService_1 = __importDefault(require("../../../services/driver/information/midiaService"));
const midiaController = express_1.default.Router();
exports.midiaController = midiaController;
const err = new handleError_1.default();
midiaController
    .route("/org/driver/information/midia/uri/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Midia = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(Midia.uri, "uri is undefined or null");
        err.exceptionFieldIsEmpty(Midia.uri, "uri can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        //   Midia.uri = cryptography.encrypt(Midia.uri);
        const midiaService = new midiaService_1.default(Midia.uri);
        yield midiaService.save();
        return res.status(201).json({ msg: "midia uri saved" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
}));
midiaController
    .route("/org/driver/information/midia/uri/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Midia = Object.assign({}, req.query);
    const midiaService = new midiaService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const midiaFromCache = yield cache.getCache(`midia_uri`);
        if (midiaFromCache) {
            const data = JSON.parse(midiaFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield midiaService.getAll(Midia.page, Midia.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`midia_uri`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
}));
midiaController
    .route("/org/driver/information/midia/uri/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Midia = Object.assign({}, req.params);
    const midiaService = new midiaService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const midiaFromCache = yield cache.getCache(`midia_uri_${Midia.id}`);
        if (midiaFromCache) {
            const data = JSON.parse(midiaFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield midiaService.getById(Midia.id);
        if (data === "midia not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`midia_uri_${Midia.id}`, JSON.stringify(data), 300);
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
midiaController
    .route("/org/driver/information/midia/uri/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const midiaService = new midiaService_1.default();
    try {
        const midiaUriExistsOrNotExists = yield midiaService.getAll();
        if (midiaUriExistsOrNotExists === "no data")
            return res.status(404).json({
                error: midiaUriExistsOrNotExists,
            });
        yield midiaService.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" + __ });
    }
}));
midiaController
    .route("/org/driver/information/midia/uri/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Midia = Object.assign({}, req.params);
    const midiaService = new midiaService_1.default();
    try {
        const midiaUriExistsOrNotExists = yield midiaService.getById(Midia.id);
        if (midiaUriExistsOrNotExists === "midia not found")
            return res.status(404).json({
                error: midiaUriExistsOrNotExists,
            });
        yield midiaService.deleteById(Midia.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
}));
