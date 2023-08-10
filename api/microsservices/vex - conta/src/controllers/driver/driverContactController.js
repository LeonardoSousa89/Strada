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
exports.driverContactController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const driverContactService_1 = __importDefault(require("../../services/driver/driverContactService"));
const driverContactController = express_1.default.Router();
exports.driverContactController = driverContactController;
const err = new handleError_1.default();
driverContactController.route('/org/driver/contact/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(DriverContact.telephone, 'telephone is undefined or null');
        err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), 'telephone can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const driverContactService = new driverContactService_1.default(DriverContact.telephone);
        yield driverContactService.save();
        return res.status(201).json({ msg: 'driver telephone save' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(DriverContact.telephone, 'telephone is undefined or null');
        err.exceptionFieldIsEmpty(DriverContact.telephone.trim(), 'telephone can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverTelephoneExistsOrNotExists = yield new driverContactService_1.default()
        .verifyId(req.params.id);
    if (driverTelephoneExistsOrNotExists === false)
        return res.status(404)
            .json({
            error: 'driver telephone not found'
        });
    try {
        const driverContactService = new driverContactService_1.default(DriverContact.telephone);
        yield driverContactService.update(req.params.id);
        return res.status(201).json({ msg: 'driver telephone update' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverContactService = new driverContactService_1.default();
        const data = yield driverContactService.getAll();
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
driverContactController.route('/org/driver/contact/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.params);
    const driverContactService = new driverContactService_1.default();
    try {
        const data = yield driverContactService.getById(DriverContact.id);
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver telephone not found'
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
driverContactController.route('/org/driver/contact/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverContactService = new driverContactService_1.default();
    try {
        const driverContactExistsOrNotExists = yield driverContactService.getAll();
        if (driverContactExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverContactService.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DriverContact = Object.assign({}, req.params);
    const driverContactService = new driverContactService_1.default();
    try {
        const driverExistsOrNotExists = yield driverContactService.getById(DriverContact.id);
        if (driverExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver telephone not found'
            });
        yield driverContactService.deleteById(DriverContact.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
