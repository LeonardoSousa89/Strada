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
exports.orgController = void 0;
const express_1 = __importDefault(require("express"));
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const orgController = express_1.default.Router();
exports.orgController = orgController;
const err = new handleError_1.default();
orgController.route('/org/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null');
        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty');
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty');
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty');
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty');
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty');
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty');
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty');
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const response = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password).save();
    yield response.then(__ => res.status(201).json({ msg: 'organization created' }));
}));
orgController.route('/org/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.fantasy_name, 'fantasy name is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.corporate_name, 'corporate name is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.cnpj, 'cnpj is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.org_status, 'org status is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.cnae_main_code, 'cnae main code is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.open_date, 'open date is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.password, 'password is undefined or null');
        err.exceptionFieldIsEmpty(Org.fantasy_name.trim(), 'fantasy name can not be empty');
        err.exceptionFieldIsEmpty(Org.corporate_name.trim(), 'corporate name can not be empty');
        err.exceptionFieldIsEmpty(Org.cnpj.trim(), 'cnpj can not be empty');
        err.exceptionFieldIsEmpty(Org.org_status.trim(), 'org status can not be empty');
        err.exceptionFieldIsEmpty(Org.cnae_main_code.trim(), 'cnae main code can not be empty');
        err.exceptionFieldIsEmpty(Org.open_date.trim(), 'open date can not be empty');
        err.exceptionFieldIsEmpty(Org.password.trim(), 'password can not be empty');
        err.exceptionFieldValueLessToType(Org.password.trim(), 'password must be greather than 4');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const response = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password).update(req.params.id);
    yield response.then(__ => res.status(201).json({ msg: 'organization updated' }));
}));
orgController.route('/org/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgService_1.default().getAll();
    yield response.then(data => res.status(200).json(data));
}));
orgController.route('/org/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgService_1.default().getById(req.params.id);
    yield response.then(data => res.status(200).json(data));
}));
orgController.route('/org/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgService_1.default().deleteByid(req.params.id);
    yield response.then(__ => res.status(204).json());
}));
