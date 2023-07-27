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
exports.driverDocumentController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const driverDocumentService_1 = __importDefault(require("../../services/driver/driverDocumentService"));
const driverDocumentController = express_1.default.Router();
exports.driverDocumentController = driverDocumentController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
driverDocumentController.route('/org/driver/document/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.cnh, 'document is undefined or null');
        err.exceptionFieldIsEmpty(Driver.cnh.trim(), 'document can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverDocumentExistsOrNotExists = yield new driverDocumentService_1.default()
        .verifyDocument(Driver.cnh);
    if (driverDocumentExistsOrNotExists === true)
        return res.status(400)
            .json({
            error: 'driver document already exists'
        });
    try {
        const driverDocument = new driverDocumentService_1.default(Driver.cnh);
        yield driverDocument.save();
        return res.status(201).json({ msg: 'driver document save' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverDocumentController.route('/org/driver/document/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.cnh, 'document is undefined or null');
        err.exceptionFieldIsEmpty(Driver.cnh.trim(), 'document can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const driverDocumentExistsOrNotExists = yield new driverDocumentService_1.default()
        .verifyId(req.params.id);
    if (driverDocumentExistsOrNotExists === false)
        return res.status(404)
            .json({
            error: 'driver document not found'
        });
    try {
        const driverDocument = new driverDocumentService_1.default(Driver.telephone);
        yield driverDocument.update(req.params.id);
        return res.status(201).json({ msg: 'driver document update' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverDocumentController.route('/org/driver/document/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverDocument = new driverDocumentService_1.default();
        const data = yield driverDocument.getAll();
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
driverDocumentController.route('/org/driver/document/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverDocument = new driverDocumentService_1.default();
        const data = yield driverDocument.getById(req.params.id);
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver document not found'
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
driverDocumentController.route('/org/driver/document/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverDocument = new driverDocumentService_1.default();
        const driverDocumentExistsOrNotExists = yield driverDocument.getAll();
        if (driverDocumentExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverDocument.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
driverDocumentController.route('/org/driver/document/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    try {
        const driverDocument = new driverDocumentService_1.default();
        const driverDocumentExistsOrNotExists = yield driverDocument.getById(Driver.id);
        if (driverDocumentExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver document not found'
            });
        yield driverDocument.deleteById(Driver.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
