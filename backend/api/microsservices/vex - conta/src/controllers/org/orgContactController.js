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
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
const orgContactController = express_1.default.Router();
exports.orgContactController = orgContactController;
const err = new handleError_1.default();
orgContactController.route("/org/contact/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
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
        return res.status(201).json({
            msg: "organization contact saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgContactController.route("/org/contact/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.body);
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
        return res.status(201).json({
            msg: "organization contact updated",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
orgContactController.route("/org/contact/get-all").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
orgContactController
    .route("/org/contact/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
orgContactController
    .route("/org/contact/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const OrgContact = Object.assign({}, req.params);
    const orgContactService = new orgContactService_1.default();
    try {
        const verifyId = new orgContactService_1.default();
        const orgContactIdExistsOnDb = yield verifyId.verifyId(OrgContact.id);
        if (orgContactIdExistsOnDb === false)
            return res.status(404).json({
                error: "organization contact not found",
            });
        yield orgContactService.deleteById(OrgContact.id);
        return res.status(204).json({});
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
