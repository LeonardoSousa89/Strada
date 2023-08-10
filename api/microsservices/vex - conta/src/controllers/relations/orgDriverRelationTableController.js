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
exports.orgDriverRelationTableController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const driverService_1 = __importDefault(require("../../services/driver/driverService"));
const OrgDriverRelationTableService_1 = __importDefault(require("../../services/relations/OrgDriverRelationTableService"));
const orgDriverRelationTableController = express_1.default.Router();
exports.orgDriverRelationTableController = orgDriverRelationTableController;
const err = new handleError_1.default();
orgDriverRelationTableController.route('/org/driver/relation-table/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.driver_relation_id, 'org driver id is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.org_relation_id, 'org id is undefined or null');
        err.exceptionFieldIsEqualZero(Org.driver_relation_id, 'org driver id code can not be 0');
        err.exceptionFieldIsEqualZero(Org.org_relation_id, 'org id can not be 0');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyOrgIdExixts = yield new orgService_1.default()
        .verifyId(Org.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404)
            .json({
            error: "organization id not found"
        });
    const verifyOrgContactIdExixts = yield new driverService_1.default()
        .verifyId(Org.driver_relation_id);
    if (verifyOrgContactIdExixts == false)
        return res.status(404)
            .json({
            error: "organization driver id not found"
        });
    const verifyRelationshipExists = yield new OrgDriverRelationTableService_1.default()
        .verifyRelationshipExists(Org.driver_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(404)
            .json({
            error: "relationship already exists"
        });
    try {
        const driverAndOrganizationRelationShip = new OrgDriverRelationTableService_1.default(Org.driver_relation_id, Org.org_relation_id);
        yield driverAndOrganizationRelationShip.save();
        return res.status(201).json({
            msg: 'organizaton driver relationship save'
        });
    }
    catch (e) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
orgDriverRelationTableController.route('/org/driver/relation-table/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = new OrgDriverRelationTableService_1.default();
    try {
        const data = yield driver.getAll();
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'no data relashionship'
            });
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
