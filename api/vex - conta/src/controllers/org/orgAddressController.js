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
        err.exceptionFieldNullOrUndefined(OrgAddress.number, 'number is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, 'neighborhood is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.county, 'county is undefined or null');
        err.exceptionFieldNullOrUndefined(OrgAddress.country, 'country is undefined or null');
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), 'zip code can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), 'street type can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), 'public place can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.number.trim(), 'number can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), 'neighborhood can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), 'county can not be empty');
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), 'country can not be empty');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const response = new orgAddressServices_1.default(OrgAddress.zip_code, OrgAddress.street_type, OrgAddress.public_place, OrgAddress.number, OrgAddress.complement, OrgAddress.neighborhood, OrgAddress.county, OrgAddress.country).save();
    return yield response.then(__ => res.status(201)
        .json({
        msg: 'organization address saved'
    }))
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
