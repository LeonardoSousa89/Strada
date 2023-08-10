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
exports.orgContactRelationTableController = void 0;
const express_1 = __importDefault(require("express"));
const orgContactRelationTableService_1 = __importDefault(require("../../../services/org/relations/orgContactRelationTableService"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const orgService_1 = __importDefault(require("../../../services/org/orgService"));
const orgContactService_1 = __importDefault(require("../../../services/org/orgContactService"));
const orgContactRelationTableController = express_1.default.Router();
exports.orgContactRelationTableController = orgContactRelationTableController;
const err = new handleError_1.default();
orgContactRelationTableController.route('/org/contact/relation-table/save').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.body);
    try {
        err.exceptionFieldNullOrUndefined(Org.org_contact_relation_id, 'org contact id is undefined or null');
        err.exceptionFieldNullOrUndefined(Org.org_relation_id, 'org id is undefined or null');
        err.exceptionFieldIsEqualZero(Org.org_contact_relation_id, 'org contact id code can not be 0');
        err.exceptionFieldIsEqualZero(Org.org_relation_id, 'org id can not be 0');
    }
    catch (e) {
        return res.status(400).json({ error: e });
    }
    const verifyOrgIdExixts = yield new orgService_1.default().verifyId(Org.org_relation_id);
    if (verifyOrgIdExixts == false)
        return res.status(404)
            .json({
            error: "organization id not found"
        });
    const verifyOrgContactIdExixts = yield new orgContactService_1.default().verifyId(Org.org_contact_relation_id);
    if (verifyOrgContactIdExixts == false)
        return res.status(404)
            .json({
            error: "organization contact id not found"
        });
    const verifyRelationshipExists = yield new orgContactRelationTableService_1.default()
        .verifyRelationshipExists(Org.org_contact_relation_id);
    if (verifyRelationshipExists == true)
        return res.status(400).json({
            error: "relationship already exists"
        });
    try {
        const response = new orgContactRelationTableService_1.default(Org.org_contact_relation_id, Org.org_relation_id);
        yield response.save();
        return res.status(201)
            .json({
            msg: 'organization contact relation saved'
        });
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));
orgContactRelationTableController.route('/org/contact/relation-table/get-all').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgContactRelationTableService = new orgContactRelationTableService_1.default();
    try {
        const data = yield orgContactRelationTableService.getAll();
        if (data.length === 0)
            return res.status(404)
                .json({
                error: 'no data relationship'
            });
        return res.status(200).json(data);
    }
    catch (__) {
        return res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
    }
}));