"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = require("../../security/cryptography/bcrypt");
dotenv.config();
const orgController = express_1.default.Router();
exports.orgController = orgController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
/* [ controlador de verificação de existência do cnpj] */
orgController.route('/org/verify-cnpj').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Org = Object.assign({}, req.query);
    let url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${Org.cnpj}`;
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    yield axios_1.default.get(url).then(response => {
        if (response.data.error) {
            res.status(404).json({
                organizationExists: false
            });
        }
        else {
            res.status(200).json({
                organizationExists: true
            });
        }
    }).catch(_ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
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
    //verifica se o cnpj passado na url da requisição, existe através de uma api externa
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    let cnpj = Object.assign({}, req.query);
    let url = `${process.env.CNPJ_API_URL_BASE}/buscarcnpj?cnpj=${cnpj.cnpj}`;
    let cnpjRequestResponse = '';
    try {
        cnpjRequestResponse = yield axios_1.default.get(url);
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
    if (cnpjRequestResponse.data.error)
        return res.status(404)
            .json({ error: 'cnpj not found' });
    //verifica se o cnpj no body da requisição já está cadastrado no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationCnpj = new orgService_1.default().verifyCnpj(Org.cnpj);
    const cnpjDbResponse = yield verificationCnpj.then(e => e);
    if (cnpjDbResponse === true)
        return res.status(400)
            .json({
            error: 'cnpj already exists'
        });
    try {
        Org.password = (0, bcrypt_1.cryptograph)(Org.password);
        const response = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password).save();
        return yield response.then(__ => res.status(201)
            .json({
            msg: 'organization created'
        }));
    }
    catch (e) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
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
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgService_1.default().verifyId(req.params.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization not found'
        });
    try {
        Org.password = (0, bcrypt_1.cryptograph)(Org.password);
        const response = new orgService_1.default(Org.fantasy_name, Org.corporate_name, Org.cnpj, Org.org_status, Org.cnae_main_code, Org.open_date, Org.password).update(req.params.id);
        return yield response.then(__ => res.status(201)
            .json({
            msg: 'organization updated'
        }));
    }
    catch (e) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
orgController.route('/org/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    const response = new orgService_1.default().getAll(Org.size, Org.page);
    yield response.then(data => {
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'no data'
            });
        return res.status(200).json(data);
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server' + __
    }));
}));
orgController.route('/org/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgService_1.default().getById(req.params.id);
    yield response.then(data => {
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'organization not found'
            });
        return res.status(200).json(data);
    }).catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
orgController.route('/org/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgService_1.default().verifyId(Org.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization not found'
        });
    const response = new orgService_1.default().deleteById(Org.id);
    return yield response.then(__ => res.status(204)
        .json({}))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
