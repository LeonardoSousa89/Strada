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
exports.deleteOrgContactById = exports.getOrgContactById = exports.getOrgContact = exports.updateOrgContact = exports.saveOrgContact = void 0;
const orgContactService_1 = __importDefault(require("../../services/org/orgContactService"));
const handleError_1 = __importDefault(require("../../../../interface/error/handleError"));
const redis_cache_operation_1 = __importDefault(require("../../../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const err = new handleError_1.default();
const saveOrgContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgContact.telephone, "telephone is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, "ddd is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgContact.email, "email place is undefined or null");
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), "telephone can not be empty");
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), "ddd can not be empty");
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), "email place can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    try {
        OrgContact.telephone = cryptography.encrypt(OrgContact.telephone);
        OrgContact.ddd = cryptography.encrypt(OrgContact.ddd);
        OrgContact.email = cryptography.encrypt(OrgContact.email);
        const orgContactService = new orgContactService_1.default(OrgContact.telephone, OrgContact.ddd, OrgContact.email);
        yield orgContactService.save();
        const orgFromCache = yield cache.getCache(`orgContact`);
        if (orgFromCache)
            yield cache.deleteCache("orgContact");
        return res.status(201).json({
            msg: "organization contact saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.saveOrgContact = saveOrgContact;
const updateOrgContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
    const cache = new redis_cache_operation_1.default();
    const cryptography = new cryptography_1.default();
    try {
        err.exceptionFieldNullOrUndefined(OrgContact.telephone, "telephone is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgContact.ddd, "ddd is undefined or null");
        err.exceptionFieldNullOrUndefined(OrgContact.email, "email place is undefined or null");
        err.exceptionFieldIsEmpty(OrgContact.telephone.trim(), "telephone can not be empty");
        err.exceptionFieldIsEmpty(OrgContact.ddd.trim(), "ddd can not be empty");
        err.exceptionFieldIsEmpty(OrgContact.email.trim(), "email place can not be empty");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyId = new orgContactService_1.default().verifyId(req.params.id);
    const dataIdDbResponse = yield verifyId.then((e) => e);
    if (dataIdDbResponse === false)
        return res.status(404).json({
            error: "organization contact not found",
        });
    try {
        OrgContact.telephone = cryptography.encrypt(OrgContact.telephone);
        OrgContact.ddd = cryptography.encrypt(OrgContact.ddd);
        OrgContact.email = cryptography.encrypt(OrgContact.email);
        const orgContactService = new orgContactService_1.default(OrgContact.telephone, OrgContact.ddd, OrgContact.email);
        yield orgContactService.update(req.params.id);
        const orgFromCache = yield cache.getCache(`orgContact`);
        if (orgFromCache)
            yield cache.deleteCache("orgContact");
        const orgFromCacheById = yield cache.getCache(`orgContact_${req.params.id}`);
        if (orgFromCacheById)
            yield cache.deleteCache(`orgContact_${req.params.id}`);
        return res.status(201).json({
            msg: "organization contact updated",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.updateOrgContact = updateOrgContact;
const getOrgContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.query);
    const orgContactService = new orgContactService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgContactFromCache = yield cache.getCache(`orgContact`);
        if (orgContactFromCache) {
            const data = JSON.parse(orgContactFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgContactService.getAll(OrgContact.page, OrgContact.size);
        if (data === "no data") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgContact`, JSON.stringify(data), 300);
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
exports.getOrgContact = getOrgContact;
const getOrgContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.params);
    const orgContactService = new orgContactService_1.default();
    const cache = new redis_cache_operation_1.default();
    try {
        const orgContactFromCache = yield cache.getCache(`orgContact_${OrgContact.id}`);
        if (orgContactFromCache) {
            const data = JSON.parse(orgContactFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgContactService.getById(OrgContact.id);
        if (data === "org contact not found") {
            return res.status(404).json({
                error: data,
            });
        }
        yield cache.setCache(`orgContact_${OrgContact.id}`, JSON.stringify(data), 300);
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
exports.getOrgContactById = getOrgContactById;
const deleteOrgContactById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.params);
    const cache = new redis_cache_operation_1.default();
    const orgContactService = new orgContactService_1.default();
    try {
        const verifyId = new orgContactService_1.default();
        const orgContactIdExistsOnDb = yield verifyId.verifyId(OrgContact.id);
        if (orgContactIdExistsOnDb === false)
            return res.status(404).json({
                error: "organization contact not found",
            });
        yield orgContactService.deleteById(OrgContact.id);
        const orgFromCache = yield cache.getCache(`orgContact`);
        if (orgFromCache)
            yield cache.deleteCache("orgContact");
        const orgFromCacheById = yield cache.getCache(`orgContact_${OrgContact.id}`);
        if (orgFromCacheById)
            yield cache.deleteCache(`orgContact_${OrgContact.id}`);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteOrgContactById = deleteOrgContactById;
