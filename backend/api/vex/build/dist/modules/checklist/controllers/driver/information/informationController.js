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
exports.deleteInformationById = exports.deleteAllInformation = exports.getInformationById = exports.getInformation = exports.saveInformation = void 0;
const handleError_1 = __importDefault(require("../../../../../interface/error/handleError"));
const informationService_1 = __importDefault(require("../../../services/driver/information/informationService"));
const redis_cache_operation_1 = __importDefault(require("../../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../../security/controllers/cryptography/cryptography"));
const time_1 = __importDefault(require("../../../../../config/tools/time"));
const err = new handleError_1.default();
const saveInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(Information.plate, "plate is undefined or null");
        err.exceptionFieldNullOrUndefined(Information.notes, "notes is undefined or null");
        err.exceptionFieldIsEmpty(Information.plate.trim(), "plate can not be empty");
        err.exceptionFieldIsEmpty(Information.notes.trim(), "notes can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const startingKmOrFinalKmBothIsIlegalCondition = new informationService_1.default().verifyInformation(Information.starting_km, Information.final_km);
    if (startingKmOrFinalKmBothIsIlegalCondition === false)
        return res.status(400).json({
            error: "starting km and final km both can not be empty or null",
        });
    try {
        Information.starting_km = cryptography.encrypt(Information.starting_km);
        Information.final_km = cryptography.encrypt(Information.final_km);
        Information.plate = cryptography.encrypt(Information.plate);
        Information.notes = cryptography.encrypt(Information.notes);
        let date_time_registry = new time_1.default().getTime();
        date_time_registry = cryptography.encrypt(date_time_registry);
        const informationService = new informationService_1.default(Information.starting_km, Information.final_km, Information.plate, Information.notes, date_time_registry);
        yield informationService.save();
        return res.status(201).json({ msg: "driver information saved" });
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.saveInformation = saveInformation;
const getInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.query);
    const informationService = new informationService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const informationFromCache = yield cache.getCache(`information`);
        if (informationFromCache) {
            const data = JSON.parse(informationFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield informationService.getAll(Information.page, Information.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`information`, JSON.stringify(data), 300);
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
exports.getInformation = getInformation;
const getInformationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.params);
    const informationService = new informationService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const informationFromCache = yield cache.getCache(`information_${Information.id}`);
        if (informationFromCache) {
            const data = JSON.parse(informationFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield informationService.getById(Information.id);
        if (data === "information not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`information_${Information.id}`, JSON.stringify(data), 300);
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
exports.getInformationById = getInformationById;
const deleteAllInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const informationService = new informationService_1.default();
    try {
        const driverInformationExistsOrNotExists = yield informationService.getAll();
        if (driverInformationExistsOrNotExists === "no data")
            return res.status(404).json({
                error: driverInformationExistsOrNotExists,
            });
        yield informationService.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteAllInformation = deleteAllInformation;
const deleteInformationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.params);
    const informationService = new informationService_1.default();
    try {
        const driverInformationExistsOrNotExists = yield informationService.getById(Information.id);
        if (driverInformationExistsOrNotExists === "information not found")
            return res.status(404).json({
                error: driverInformationExistsOrNotExists,
            });
        yield informationService.deleteById(Information.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "i am sorry, there is an error with server" });
    }
});
exports.deleteInformationById = deleteInformationById;
