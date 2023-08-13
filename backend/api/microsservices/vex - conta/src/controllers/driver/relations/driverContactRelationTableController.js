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
exports.driverContactRelationTableController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const driverService_1 = __importDefault(require("../../../services/driver/driverService"));
const driverContactService_1 = __importDefault(require("../../../services/driver/driverContactService"));
const orgService_1 = __importDefault(require("../../../services/org/orgService"));
const driverContactRelationTableService_1 = __importDefault(require("../../../services/driver/relations/driverContactRelationTableService"));
const driverContactRelationTableController = express_1.default.Router();
exports.driverContactRelationTableController = driverContactRelationTableController;
const err = new handleError_1.default();
driverContactRelationTableController
    .route("/org/driver/contact/relation-table/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.driver_contact_relation_id, "driver contact id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.driver_relation_id, "driver id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.org_relation_id, "org id is undefined or null");
        err.exceptionFieldIsEqualZero(Driver.driver_contact_relation_id, "driver contact id code can not be 0");
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
    const verifyDriverContactIdExixts = yield new driverContactService_1.default().verifyId(Driver.driver_contact_relation_id);
    if (verifyDriverContactIdExixts == false)
        return res.status(404).json({
            error: "driver contact id not found",
        });
    const verifyOrgIdExixts = yield new orgService_1.default().verifyId(Driver.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404).json({
            error: "org id not found",
        });
    const verifyRelationshipExists = yield new driverContactRelationTableService_1.default().verifyRelationshipExists(Driver.driver_contact_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(400).json({
            error: "relationship already exists",
        });
    try {
        const driverAndContactRelation = new driverContactRelationTableService_1.default(Driver.driver_contact_relation_id, Driver.driver_relation_id, Driver.org_relation_id);
        yield driverAndContactRelation.save();
        return res.status(201).json({
            msg: "driver contact relation saved",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
driverContactRelationTableController
    .route("/org/driver/contact/relation-table/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAndContactRelation = new driverContactRelationTableService_1.default();
    try {
        const data = yield driverAndContactRelation.getAll();
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
}));
