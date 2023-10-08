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
exports.orgDriverRelationTableRoute = void 0;
const express_1 = __importDefault(require("express"));
const orgDriverRelationTableController_1 = require("../../controllers/org/relations/orgDriverRelationTableController");
const orgDriverRelationTableRoute = express_1.default.Router();
exports.orgDriverRelationTableRoute = orgDriverRelationTableRoute;
orgDriverRelationTableRoute
    .route("/org/driver/relation-table/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgDriverRelationTableController_1.saveOrgDriverRelationTable)(req, res);
}));
orgDriverRelationTableRoute
    .route("/org/driver/relation-table/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgDriverRelationTableController_1.getOrgDriverRelationTable)(req, res);
}));
orgDriverRelationTableRoute
    .route("/org/driver/relation-table/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgDriverRelationTableController_1.getOrgDriverRelationTableById)(req, res);
}));
orgDriverRelationTableRoute
    .route("/org/driver/relation-table/delete/all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgDriverRelationTableController_1.deleteOrgDriverRelationTable)(req, res);
}));
orgDriverRelationTableRoute
    .route("/org/driver/relation-table/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgDriverRelationTableController_1.deleteOrgDriverRelationTableById)(req, res);
}));
