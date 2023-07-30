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
exports.driverController = void 0;
const express_1 = __importDefault(require("express"));
const driverService_1 = __importDefault(require("../../services/driver/driverService"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const bcrypt_1 = require("../../security/cryptography/bcrypt");
const driverController = express_1.default.Router();
exports.driverController = driverController;
const err = new handleError_1.default();
driverController.route('/org/driver/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.first_name, 'first name is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.last_name, 'last name is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.email, 'email place is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.password, 'password place is undefined or null');
        err.exceptionFieldIsEmpty(Driver.first_name.trim(), 'first name can not be empty');
        err.exceptionFieldIsEmpty(Driver.last_name.trim(), 'last name can not be empty');
        err.exceptionFieldIsEmpty(Driver.email.trim(), 'email place can not be empty');
        err.exceptionFieldIsEmpty(Driver.password.trim(), 'password place can not be empty');
        err.exceptionFieldValueLessToType(Driver.password, 'password can not be less than 4');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const emailIdExistsOnDb = yield new driverService_1.default().verifyEmail(Driver.email);
    if (emailIdExistsOnDb === true)
        return res.status(400)
            .json({
            error: 'email already exists'
        });
    Driver.password = (0, bcrypt_1.cryptograph)(Driver.password);
    try {
        const driverService = new driverService_1.default(Driver.first_name, Driver.last_name, Driver.email, Driver.password);
        yield driverService.save();
        return res.status(201).json({ msg: 'driver saved' });
    }
    catch (e) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverController.route('/org/driver/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.first_name, 'first name is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.last_name, 'last name is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.email, 'email place is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.password, 'password place is undefined or null');
        err.exceptionFieldIsEmpty(Driver.first_name.trim(), 'first name can not be empty');
        err.exceptionFieldIsEmpty(Driver.last_name.trim(), 'last name can not be empty');
        err.exceptionFieldIsEmpty(Driver.email.trim(), 'email place can not be empty');
        err.exceptionFieldIsEmpty(Driver.password.trim(), 'password place can not be empty');
        err.exceptionFieldValueLessToType(Driver.password, 'password can not be less than 4');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    Driver.password = (0, bcrypt_1.cryptograph)(Driver.password);
    try {
        const driverService = new driverService_1.default(Driver.first_name, Driver.last_name, Driver.email, Driver.password);
        yield driverService.update(req.params.id);
        return res.status(201).json({ msg: 'driver update' });
    }
    catch (e) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverController.route('/org/driver/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverService = new driverService_1.default();
    try {
        const data = yield driverService.getAll();
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver not found'
            });
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverController.route('/org/driver/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    const driverService = new driverService_1.default();
    try {
        const data = yield driverService.getById(Driver.id);
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver not found'
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
driverController.route('/org/driver/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverService = new driverService_1.default();
    try {
        const driverIdExistsOnDb = yield driverService.getAll();
        if (driverIdExistsOnDb.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverService.deleteAll();
        return res.status(204).json({});
    }
    catch (e) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverController.route('/org/driver/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverService = new driverService_1.default();
    const Driver = Object.assign({}, req.params);
    try {
        const driverIdExistsOnDb = yield driverService.getById(Driver.id);
        if (driverIdExistsOnDb.length === 0)
            return res.status(404)
                .json({
                error: 'driver not found'
            });
        yield driverService.deleteById(Driver.id);
        return res.status(204).json({});
    }
    catch (e) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
