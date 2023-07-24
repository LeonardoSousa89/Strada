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
exports.orgContactController = void 0;
const express_1 = __importDefault(require("express"));
const orgContactService_1 = __importDefault(require("../../services/org/orgContactService"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const orgContactController = express_1.default.Router();
exports.orgContactController = orgContactController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
orgContactController.route('/org/contact/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(OrgContact.telephone, 'telephone is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, 'ddd is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgContact.email, 'email place is undefined or null');
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), 'telephone can not be empty');
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), 'ddd can not be empty');
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), 'email place can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const response = new orgContactService_1.default(OrgContact.telephone, OrgContact.ddd, OrgContact.email).save();
    return yield response.then(__ => res.status(201)
        .json({
        msg: 'organization contact save'
    }))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server' + __
    }));
}));
orgContactController.route('/org/contact/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(OrgContact.telephone, 'telephone is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, 'ddd is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgContact.email, 'email place is undefined or null');
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), 'telephone can not be empty');
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), 'ddd can not be empty');
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), 'email place can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgContactService_1.default().verifyId(req.params.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization contact not found'
        });
    const response = new orgContactService_1.default(OrgContact.telephone, OrgContact.ddd, OrgContact.email).update(req.params.id);
    return yield response.then(__ => res.status(201)
        .json({
        msg: 'organization contact update'
    }))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server' + __
    }));
}));
orgContactController.route('/org/contact/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgContactService_1.default().getAll();
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
        error: 'i am sorry, there is an error with server'
    }));
}));
orgContactController.route('/org/contact/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgContactService_1.default().getById(req.params.id);
    yield response.then(data => {
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'organization contact not found'
            });
        return res.status(200).json(data);
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
orgContactController.route('/org/contact/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.params);
    const response = new orgContactService_1.default().deleteById(OrgContact.id);
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgContactService_1.default().verifyId(OrgContact.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization contact not found'
        });
    yield response.then(__ => {
        return res.status(204).json({});
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
