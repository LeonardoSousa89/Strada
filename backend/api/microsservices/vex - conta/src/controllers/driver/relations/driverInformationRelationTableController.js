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
exports.driverInformationRelationTableController = void 0;
const express_1 = __importDefault(require("express"));
const driverInformationRelationTableService_1 = __importDefault(require("../../../services/driver/relations/driverInformationRelationTableService"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const driverService_1 = __importDefault(require("../../../services/driver/driverService"));
const informationService_1 = __importDefault(require("../../../services/driver/information/informationService"));
const orgService_1 = __importDefault(require("../../../services/org/orgService"));
const driverInformationRelationTableService_2 = __importDefault(require("../../../services/driver/relations/driverInformationRelationTableService"));
const driverInformationRelationTableController = express_1.default.Router();
exports.driverInformationRelationTableController = driverInformationRelationTableController;
const err = new handleError_1.default();
driverInformationRelationTableController
    .route("/org/driver/information/relation-table/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Driver = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Driver.driver_relation_id, "driver id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.information_relation_id, "driver information id is undefined or null");
        err.exceptionFieldNullOrUndefined(Driver.org_relation_id, "org id is undefined or null");
        err.exceptionFieldIsEqualZero(Driver.driver_relation_id, "driver id can not be 0");
        err.exceptionFieldIsEqualZero(Driver.information_relation_id, "driver information id can not be 0");
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
    const verifyInformationIdExixts = yield new informationService_1.default().verifyId(Driver.information_relation_id);
    if (verifyInformationIdExixts == false)
        return res.status(404).json({
            error: "driver information id not found",
        });
    const verifyOrgIdExixts = yield new orgService_1.default().verifyId(Driver.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404).json({
            error: "org id not found",
        });
    const verifyRelationshipExists = yield new driverInformationRelationTableService_2.default().verifyRelationshipExists(Driver.information_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(400).json({
            error: "relationship already exists",
        });
    try {
        const driverAndInformationRelation = new driverInformationRelationTableService_1.default(Driver.driver_relation_id, Driver.information_relation_id, Driver.org_relation_id);
        yield driverAndInformationRelation.save();
        return res.status(201).json({
            msg: "driver information relation save",
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
driverInformationRelationTableController
    .route("/org/driver/information/relation-table/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driverAndInformationRelation = new driverInformationRelationTableService_1.default();
    try {
        const data = yield driverAndInformationRelation.getAll();
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
