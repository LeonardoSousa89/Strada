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
exports.deleteDriverAddressRelationTableById = exports.deleteAllDriverAddressRelationTable = exports.getDriverAddressRelationTableById = exports.getDriverAddressRelationTable = exports.saveDriverAddressRelationTable = void 0;
const driveAddressRelationTableService_1 = __importDefault(require("../../../services/driver/relations/driveAddressRelationTableService"));
const handleError_1 = __importDefault(require("../../../../../interface/error/handleError"));
const driverService_1 = __importDefault(require("../../../services/driver/driverService"));
const driverAddressService_1 = __importDefault(require("../../../services/driver/driverAddressService"));
const orgService_1 = __importDefault(require("../../../../admin/services/org/orgService"));
const err = new handleError_1.default();
const saveDriverAddressRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.driver_address_relation_id, "driver address id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.driver_relation_id, "driver id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.org_relation_id, "org id is undefined or null");
        err.exceptionFieldIsEqualZero(Driver.driver_address_relation_id, "driver address id code can not be 0");
        err.exceptionFieldIsEqualZero(Driver.driver_relation_id, "driver id can not be 0");
        err.exceptionFieldIsEqualZero(Driver.org_relation_id, "org id can not be 0");
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyDriverIdExixts = yield new driverService_1.default().verifyId(Driver.driver_relation_id);
    if (verifyDriverIdExixts == false)
        return res.status(404).json({
            error: "driver id not found",
        });
    const verifyDriverAddressIdExixts = yield new driverAddressService_1.default().verifyId(Driver.driver_address_relation_id);
    if (verifyDriverAddressIdExixts == false)
        return res.status(404).json({
            error: "driver address id not found",
        });
    const verifyOrgIdExixts = yield new orgService_1.default().verifyId(Driver.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404).json({
            error: "org id not found",
        });
    const verifyRelationshipExists = yield new driveAddressRelationTableService_1.default().verifyRelationshipExists(Driver.driver_address_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(400).json({
            error: "relationship already exists",
        });
    try {
        const driverAndAddressRelation = new driveAddressRelationTableService_1.default(Driver.driver_address_relation_id, Driver.driver_relation_id, Driver.org_relation_id);
        yield driverAndAddressRelation.save();
        return res.status(201).json({
            msg: "driver address relation saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.saveDriverAddressRelationTable = saveDriverAddressRelationTable;
const getDriverAddressRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAndAddressRelation = new driveAddressRelationTableService_1.default();
    try {
        const data = yield driverAndAddressRelation.getAll();
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
exports.getDriverAddressRelationTable = getDriverAddressRelationTable;
const getDriverAddressRelationTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    const driverAndAddressRelation = new driveAddressRelationTableService_1.default();
    try {
        const data = yield driverAndAddressRelation.getById(Driver.id);
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
exports.getDriverAddressRelationTableById = getDriverAddressRelationTableById;
const deleteAllDriverAddressRelationTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAndAddressRelation = new driveAddressRelationTableService_1.default();
    try {
        const driverAddressRelationExistsOrNotExists = yield driverAndAddressRelation.getAll();
        if (driverAddressRelationExistsOrNotExists.length === 0)
            return res.status(404).json({
                error: "no data relationship",
            });
        yield driverAndAddressRelation.deleteAll();
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteAllDriverAddressRelationTable = deleteAllDriverAddressRelationTable;
const deleteDriverAddressRelationTableById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.params);
    const driverAndAddressRelation = new driveAddressRelationTableService_1.default();
    try {
        const driverAddressRelationExistsOrNotExists = yield driverAndAddressRelation.verifyId(Number(Driver.id));
        if (driverAddressRelationExistsOrNotExists === false)
            return res.status(404).json({
                error: "no data relationship founded by id sended",
            });
        yield driverAndAddressRelation.deleteById(Driver.id);
        return res.status(204).json();
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
});
exports.deleteDriverAddressRelationTableById = deleteDriverAddressRelationTableById;
