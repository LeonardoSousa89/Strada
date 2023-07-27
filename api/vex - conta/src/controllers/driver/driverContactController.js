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
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverContactController.route('/org/driver/contact/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.telephone, 'telephone is undefined or null');
        err.exceptionFieldIsEmpty(Driver.telephone.trim(), 'telephone can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        const driverContact = new driverContactService_1.default(Driver.telephone);
        yield driverContact.save();
        return res.status(201).json({ msg: 'driver telephone save' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.telephone, 'telephone is undefined or null');
        err.exceptionFieldIsEmpty(Driver.telephone.trim(), 'telephone can not be empty');
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
        const driverContact = new driverContactService_1.default(Driver.telephone);
        yield driverContact.update(req.params.id);
        return res.status(201).json({ msg: 'driver telephone update' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverContact = new driverContactService_1.default();
        const data = yield driverContact.getAll();
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
    try {
        const driverContact = new driverContactService_1.default();
        const data = yield driverContact.getById(req.params.id);
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
    try {
        const driverContact = new driverContactService_1.default();
        const driverContactExistsOrNotExists = yield driverContact.getAll();
        if (driverContactExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverContact.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverContactController.route('/org/driver/contact/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    try {
        const driverContact = new driverContactService_1.default();
        const driverExistsOrNotExists = yield driverContact.getById(Driver.id);
        if (driverExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver telephone not found'
            });
        yield driverContact.deleteById(Driver.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
