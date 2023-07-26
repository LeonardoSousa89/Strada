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
exports.driverAddressController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const driverAddressService_1 = __importDefault(require("../../services/driver/driverAddressService"));
const axios_1 = __importDefault(require("axios"));
const driverAddressController = express_1.default.Router();
exports.driverAddressController = driverAddressController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverAddressController.route('/org/driver/address/search/zip-code').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    if (!Org.ZipCode)
        return res.status(400).json({ error: 'query params required' });
    try {
        const url = `https://brasilapi.com.br/api/cep/v2/${Org.ZipCode}`;
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
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.state, 'state is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.city, 'city is undefined or null');
        err.exceptionFieldIsEmpty(Org.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(Org.state.trim(), 'state can not be empty');
        err.exceptionFieldIsEmpty(Org.city.trim(), 'city can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const driverAddress = new driverAddressService_1.default(Org.zip_code, Org.state, Org.city);
        yield driverAddress.save();
        return res.status(201).json({ msg: 'driver address saved' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.state, 'state is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.city, 'city is undefined or null');
        err.exceptionFieldIsEmpty(Org.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(Org.state.trim(), 'state can not be empty');
        err.exceptionFieldIsEmpty(Org.city.trim(), 'city can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const driverAddress = new driverAddressService_1.default(Org.zip_code, Org.state, Org.city);
        yield driverAddress.update(req.params.id);
        return res.status(201).json({ msg: 'driver address update' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverAddress = new driverAddressService_1.default();
        const data = yield driverAddress.getAll();
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        return res.status(200).json(data);
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverAddress = new driverAddressService_1.default();
        const data = yield driverAddress.getById(req.params.id);
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver address not found'
            });
        return res.status(200).json(data);
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
driverAddressController.route('/org/driver/address/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverAddress = new driverAddressService_1.default();
        const driverAddressExistsOrNotExists = yield driverAddress.getAll();
        if (driverAddressExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverAddress.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverAddressController.route('/org/driver/address/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    try {
        const driverAddress = new driverAddressService_1.default();
        const driverExistsOrNotExists = yield driverAddress.getById(Org.id);
        if (driverExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver address not found'
            });
        yield driverAddress.deleteById(Org.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
