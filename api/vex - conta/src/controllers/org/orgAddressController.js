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
exports.orgAddressController = void 0;
const express_1 = __importDefault(require("express"));
const orgAddressServices_1 = __importDefault(require("../../services/org/orgAddressServices"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const orgAddressController = express_1.default.Router();
exports.orgAddressController = orgAddressController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
orgAddressController.route('/org/address/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, 'street type is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, 'public place is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, 'number is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null');
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), 'number can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const response = new orgAddressServices_1.default(OrgAddress.zip_code, OrgAddress.street_type, OrgAddress.public_place, OrgAddress.org_number, OrgAddress.complement, OrgAddress.neighborhood, OrgAddress.county, OrgAddress.country).save();
    return yield response.then(__ => res.status(201)
        .json({
        msg: 'organization address saved'
    }))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server' + __
    }));
}));
orgAddressController.route('/org/address/update/:id').put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, 'zip code is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, 'street type is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, 'public place is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, 'number is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null');
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), 'number can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgAddressServices_1.default().verifyId(req.params.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization address not found'
        });
    const response = new orgAddressServices_1.default(OrgAddress.zip_code, OrgAddress.street_type, OrgAddress.public_place, OrgAddress.org_number, OrgAddress.complement, OrgAddress.neighborhood, OrgAddress.county, OrgAddress.country).update(req.params.id);
    return yield response.then(__ => res.status(201)
        .json({
        msg: 'organization address saved'
    }))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server' + __
    }));
}));
orgAddressController.route('/org/address/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgAddressServices_1.default().getAll();
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
orgAddressController.route('/org/address/get-by-id/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = new orgAddressServices_1.default().getById(req.params.id);
    yield response.then(data => {
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'organization address not found'
            });
        return res.status(200).json(data);
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
orgAddressController.route('/org/address/delete-by-id/:id').delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.params);
    const response = new orgAddressServices_1.default().deleteById(OrgAddress.id);
    //verifica se o id na url da requisição existe e os dados estão cadastrados no banco de dados do sistema
    //depurar, testar e delegar esta verificação a uma outra função ou interface **
    const verificationId = new orgAddressServices_1.default().verifyId(OrgAddress.id);
    const dataIdDbResponse = yield verificationId.then(e => e);
    if (dataIdDbResponse === false)
        return res.status(404)
            .json({
            error: 'organization address not found'
        });
    yield response.then(__ => {
        return res.status(204).json({});
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
