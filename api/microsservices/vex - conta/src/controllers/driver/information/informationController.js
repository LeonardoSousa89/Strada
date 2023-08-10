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
exports.informationController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const informationService_1 = __importDefault(require("../../../services/driver/information/informationService"));
const redis_cache_operation_1 = __importDefault(require("../../../repositories/redis/cache/services/redis.cache.operation"));
const informationController = express_1.default.Router();
exports.informationController = informationController;
const err = new handleError_1.default();
informationController.route('/org/driver/information/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Information.plate, 'plate is undefined or null');
        err.exceptionFieldNullOrUndefined(Information.notes, 'notes is undefined or null');
        err.exceptionFieldIsEmpty(Information.plate.trim(), 'plate can not be empty');
        err.exceptionFieldIsEmpty(Information.notes.trim(), 'notes can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const startingKmOrFinalKmBothIsIlegalCondition = new informationService_1.default()
        .verifyInformation(Information.starting_km, Information.final_km);
    if (startingKmOrFinalKmBothIsIlegalCondition === false)
        return res.status(400)
            .json({
            error: 'starting km and final km both can not be empty or null'
        });
    try {
        const date_time_registry = new informationService_1.default().getTime();
        const informationService = new informationService_1.default(Information.starting_km, Information.final_km, Information.plate, Information.notes, date_time_registry);
        yield informationService.save();
        return res.status(201).json({ msg: 'driver information saved' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
informationController.route('/org/driver/information/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const informationService = new informationService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        cache.connection();
        const informationFromCache = yield cache.getCache(`information`);
        if (informationFromCache) {
            const data = JSON.parse(informationFromCache);
            res.status(200).json({
                data: { inCache: 'yes', data }
            });
            yield cache.disconnection();
            return;
        }
        const data = yield informationService.getAll();
        if (data.length === 0) {
            res.status(404)
                .json({
                error: 'no data'
            });
            yield cache.disconnection();
            return;
        }
        yield cache.setCache(`information`, JSON.stringify(data), 300);
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
informationController.route('/org/driver/information/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.params);
    const informationService = new informationService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        cache.connection();
        const informationFromCache = yield cache.getCache(`information_${Information.id}`);
        if (informationFromCache) {
            const data = JSON.parse(informationFromCache);
            res.status(200).json({
                data: { inCache: 'yes', data }
            });
            yield cache.disconnection();
            return;
        }
        const data = yield informationService.getById(Information.id);
        if (data.length === 0) {
            res.status(404)
                .json({
                error: 'driver information not found'
            });
            yield cache.disconnection();
            return;
        }
        yield cache.setCache(`information_${Information.id}`, JSON.stringify(data), 300);
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
informationController.route('/org/driver/information/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const informationService = new informationService_1.default();
    try {
        const driverInformationExistsOrNotExists = yield informationService.getAll();
        if (driverInformationExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield informationService.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
informationController.route('/org/driver/information/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Information = Object.assign({}, req.params);
    const informationService = new informationService_1.default();
    try {
        const driverInformationExistsOrNotExists = yield informationService.getById(Information.id);
        if (driverInformationExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver information not found'
            });
        yield informationService.deleteById(Information.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
