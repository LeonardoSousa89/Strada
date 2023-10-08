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
exports.deleteOrgAndOrgIpDataProviderRelationTableById = exports.deleteOrgAndOrgIpDataProviderRelationTable = exports.getOrgAndOrgIpDataProviderRelationTableById = exports.getOrgAndOrgIpDataProviderRelationTable = exports.saveOrgAndOrgIpDataProviderRelationTable = void 0;
const orgAndOrgIpDataProviderRelationTableService_1 = __importDefault(require("../../../services/org/relations/orgAndOrgIpDataProviderRelationTableService"));
const handleError_1 = __importDefault(require("../../../../../interface/error/handleError"));
const orgService_1 = __importDefault(require("../../../services/org/orgService"));
const OrgIpDataProviderService_1 = __importDefault(require("../../../services/org/OrgIpDataProviderService"));
const orgAndOrgIpDataProviderRelationTableService_2 = __importDefault(require("../../../services/org/relations/orgAndOrgIpDataProviderRelationTableService"));
const err = new handleError_1.default();
const saveOrgAndOrgIpDataProviderRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.org_ip_data_provider_relation_id, "org machine client ip and provider id is undefined or null");
        err.exceptionFieldNullOrUndefined(Org.org_relation_id, "org id is undefined or null");
        err.exceptionFieldIsEqualZero(Org.org_ip_data_provider_relation_id, "org machine client ip and provider id code can not be 0");
        err.exceptionFieldIsEqualZero(Org.org_relation_id, "org id can not be 0");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyOrgIdExixts = yield new orgService_1.default().verifyId(Org.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404).json({
            error: "organization id not found",
        });
    const verifyOrgIpDataProviderIdExixts = yield new OrgIpDataProviderService_1.default().verifyId(Org.org_ip_data_provider_relation_id);
    if (verifyOrgIpDataProviderIdExixts == false)
        return res.status(404).json({
            error: "organization machine client ip and provider data id not found",
        });
    const verifyRelationshipExists = yield new orgAndOrgIpDataProviderRelationTableService_1.default().verifyRelationshipExists(Org.org_ip_data_provider_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(400).json({
            error: "relationship already exists",
        });
    try {
        const response = new orgAndOrgIpDataProviderRelationTableService_1.default(Org.org_ip_data_provider_relation_id, Org.org_relation_id);
        yield response.save();
        return res.status(201).json({
            msg: "organization machine client ip and provider data relation saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.saveOrgAndOrgIpDataProviderRelationTable = saveOrgAndOrgIpDataProviderRelationTable;
const getOrgAndOrgIpDataProviderRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgAndOrgIpDataProviderRelationTableService = new orgAndOrgIpDataProviderRelationTableService_2.default();
    try {
        const data = yield orgAndOrgIpDataProviderRelationTableService.getAll();
        if (data.length === 0)
            return res.status(404).json({
                error: "no data relationship",
            });
        return res.status(200).json(data);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.getOrgAndOrgIpDataProviderRelationTable = getOrgAndOrgIpDataProviderRelationTable;
const getOrgAndOrgIpDataProviderRelationTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.params);
    const orgAndOrgIpDataProviderRelationTableService = new orgAndOrgIpDataProviderRelationTableService_2.default();
    try {
        const data = yield orgAndOrgIpDataProviderRelationTableService.getById(Org.id);
        if (data.length === 0)
            return res.status(404).json({
                error: "no data relationship founded by id sended",
            });
        return res.status(200).json(data);
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.getOrgAndOrgIpDataProviderRelationTableById = getOrgAndOrgIpDataProviderRelationTableById;
const deleteOrgAndOrgIpDataProviderRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgAndOrgIpDataProviderRelationTableService = new orgAndOrgIpDataProviderRelationTableService_2.default();
    try {
        const orgAndOrgIpDataProviderRelationExistsOrNotExists = yield orgAndOrgIpDataProviderRelationTableService.getAll();
        if (orgAndOrgIpDataProviderRelationExistsOrNotExists.length === 0)
            return res.status(404).json({
                error: "no data relationship",
            });
        yield orgAndOrgIpDataProviderRelationTableService.deleteAll();
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteOrgAndOrgIpDataProviderRelationTable = deleteOrgAndOrgIpDataProviderRelationTable;
const deleteOrgAndOrgIpDataProviderRelationTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    const orgAndOrgIpDataProviderRelationTableService = new orgAndOrgIpDataProviderRelationTableService_2.default();
    try {
        const orgAndOrgIpDataProviderRelationExistsOrNotExists = yield orgAndOrgIpDataProviderRelationTableService.verifyId(Number(Driver.id));
        if (orgAndOrgIpDataProviderRelationExistsOrNotExists === false)
            return res.status(404).json({
                error: "no data relationship founded by id sended",
            });
        yield orgAndOrgIpDataProviderRelationTableService.deleteById(Driver.id);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteOrgAndOrgIpDataProviderRelationTableById = deleteOrgAndOrgIpDataProviderRelationTableById;
