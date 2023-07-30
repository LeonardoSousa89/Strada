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
const informationController = express_1.default.Router();
exports.informationController = informationController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
/**
 *
 * //data e horário de publicação da informação

      const southAmericaTimeZone=new Date()

      const date=new Intl.DateTimeFormat(
         'pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'long'
         }).format(southAmericaTimeZone)
         
      const time=new Intl.DateTimeFormat(
         'pt-BR', {
            timeZone: 'America/Sao_Paulo',
            timeStyle: 'short'
         }).format(southAmericaTimeZone)

      console.log(`data: ${date}, ${time}`)
 
 *
 */
informationController.route('/org/driver/information/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.plate, 'plate is undefined or null');
        err.exceptionFieldNullOrUndefined(Driver.notes, 'notes is undefined or null');
        err.exceptionFieldIsEmpty(Driver.plate.trim(), 'plate can not be empty');
        err.exceptionFieldIsEmpty(Driver.notes.trim(), 'notes can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const startingKmOrFinalKmBothIsIlegalCondition = new informationService_1.default()
        .verifyInformation(Driver.starting_km, Driver.final_km);
    if (startingKmOrFinalKmBothIsIlegalCondition === false)
        return res.status(400)
            .json({
            error: 'starting km and final km both can not be empty or null'
        });
    try {
        const driverInformation = new informationService_1.default(Driver.starting_km, Driver.final_km, Driver.plate, Driver.notes);
        yield driverInformation.save();
        return res.status(201).json({ msg: 'driver information save' });
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
informationController.route('/org/driver/information/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverInformation = new informationService_1.default();
        const data = yield driverInformation.getAll();
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
informationController.route('/org/driver/information/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverInformation = new informationService_1.default();
        const data = yield driverInformation.getById(req.params.id);
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'driver information not found'
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
informationController.route('/org/driver/information/delete-all').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driverInformation = new informationService_1.default();
        const driverInformationExistsOrNotExists = yield driverInformation.getAll();
        if (driverInformationExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        yield driverInformation.deleteAll();
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
informationController.route('/org/driver/information/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    try {
        const driverInformation = new informationService_1.default();
        const driverInformationExistsOrNotExists = yield driverInformation.getById(Driver.id);
        if (driverInformationExistsOrNotExists.length === 0)
            return res.status(404)
                .json({
                error: 'driver information not found'
            });
        yield driverInformation.deleteById(Driver.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500)
            .json({ error: 'i am sorry, there is an error with server' });
    }
}));
