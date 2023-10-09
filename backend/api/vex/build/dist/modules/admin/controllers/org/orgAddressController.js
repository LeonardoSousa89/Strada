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
exports.orgAddressController = exports.deleteOrgAddressById = exports.getOrgAddressById = exports.getOrgAddress = exports.updateOrgAddress = exports.saveOrgAddress = void 0;
const express_1 = __importDefault(require("express"));
const orgAddressService_1 = __importDefault(require("../../services/org/orgAddressService"));
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const orgAddressController = express_1.default.Router();
exports.orgAddressController = orgAddressController;
const err = new handleError_1.default();
const saveOrgAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, "zip code is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, "street type is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, "public place is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, "number is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, "neighborhood is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.county, "county is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.country, "country is undefined or null");
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), "zip code can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), "street type can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), "public place can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), "number can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), "neighborhood can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), "county can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), "country can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        OrgAddress.zip_code = cryptography.encrypt(OrgAddress.zip_code);
        OrgAddress.street_type = cryptography.encrypt(OrgAddress.street_type);
        OrgAddress.public_place = cryptography.encrypt(OrgAddress.public_place);
        OrgAddress.org_number = cryptography.encrypt(OrgAddress.org_number);
        OrgAddress.complement = cryptography.encrypt(OrgAddress.complement);
        OrgAddress.neighborhood = cryptography.encrypt(OrgAddress.neighborhood);
        OrgAddress.county = cryptography.encrypt(OrgAddress.county);
        OrgAddress.country = cryptography.encrypt(OrgAddress.country);
        const orgAddressService = new orgAddressService_1.default(OrgAddress.zip_code, OrgAddress.street_type, OrgAddress.public_place, OrgAddress.org_number, OrgAddress.complement, OrgAddress.neighborhood, OrgAddress.county, OrgAddress.country);
        yield orgAddressService.save();
        const orgFromCache = yield cache.getCache(`org`);
        if (orgFromCache)
            yield cache.deleteCache("org");
        return res.status(201).json({
            msg: "organization address saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.saveOrgAddress = saveOrgAddress;
const updateOrgAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.body);
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgAddress.zip_code, "zip code is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.street_type, "street type is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.public_place, "public place is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.org_number, "number is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.neighborhood, "neighborhood is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.county, "county is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgAddress.country, "country is undefined or null");
        err.exceptionFieldIsEmpty(OrgAddress.zip_code.trim(), "zip code can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.street_type.trim(), "street type can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.public_place.trim(), "public place can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.org_number.trim(), "number can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.neighborhood.trim(), "neighborhood can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.county.trim(), "county can not be empty");
        err.exceptionFieldIsEmpty(OrgAddress.country.trim(), "country can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyId = new orgAddressService_1.default().verifyId(req.params.id);
    const orgAddressIdExistsOnDb = yield verifyId.then((e) => e);
    if (orgAddressIdExistsOnDb === false)
        return res.status(404).json({
            error: "organization address not found",
        });
    try {
        OrgAddress.zip_code = cryptography.encrypt(OrgAddress.zip_code);
        OrgAddress.street_type = cryptography.encrypt(OrgAddress.street_type);
        OrgAddress.public_place = cryptography.encrypt(OrgAddress.public_place);
        OrgAddress.org_number = cryptography.encrypt(OrgAddress.org_number);
        OrgAddress.complement = cryptography.encrypt(OrgAddress.complement);
        OrgAddress.neighborhood = cryptography.encrypt(OrgAddress.neighborhood);
        OrgAddress.county = cryptography.encrypt(OrgAddress.county);
        OrgAddress.country = cryptography.encrypt(OrgAddress.country);
        const orgAddressService = new orgAddressService_1.default(OrgAddress.zip_code, OrgAddress.street_type, OrgAddress.public_place, OrgAddress.org_number, OrgAddress.complement, OrgAddress.neighborhood, OrgAddress.county, OrgAddress.country);
        yield orgAddressService.update(req.params.id);
        return res.status(201).json({
            msg: "organization address updated",
        });
    }
    catch (__) {
        res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.updateOrgAddress = updateOrgAddress;
const getOrgAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.query);
    const orgAddressService = new orgAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgAddressFromCache = yield cache.getCache(`orgAddress`);
        if (orgAddressFromCache) {
            const data = JSON.parse(orgAddressFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgAddressService.getAll(OrgAddress.page, OrgAddress.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgAddress`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server" + __,
        });
    }
});
exports.getOrgAddress = getOrgAddress;
const getOrgAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.params);
    const orgAddressService = new orgAddressService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgAddressFromCache = yield cache.getCache(`orgAddress_${OrgAddress.id}`);
        if (orgAddressFromCache) {
            const data = JSON.parse(orgAddressFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgAddressService.getById(OrgAddress.id);
        if (data === "organization address not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgAddress_${OrgAddress.id}`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.getOrgAddressById = getOrgAddressById;
const deleteOrgAddressById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgAddress = Object.assign({}, req.params);
    const orgAddressService = new orgAddressService_1.default();
    try {
        const verifyId = yield orgAddressService.verifyId(OrgAddress.id);
        if (verifyId === false)
            return res.status(404).json({
                error: "organization address not found",
            });
        orgAddressService.deleteById(OrgAddress.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteOrgAddressById = deleteOrgAddressById;
