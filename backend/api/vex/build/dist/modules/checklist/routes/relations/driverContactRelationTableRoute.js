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
exports.driverContactRelationTableRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverContactRelationTableController_1 = require("../../controllers/driver/relations/driverContactRelationTableController");
const driverContactRelationTableRoute = express_1.default.Router();
exports.driverContactRelationTableRoute = driverContactRelationTableRoute;
driverContactRelationTableRoute
    .route("/org/driver/contact/relation-table/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactRelationTableController_1.saveDriverContactRelationTable)(req, res);
}));
driverContactRelationTableRoute
    .route("/org/driver/contact/relation-table/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactRelationTableController_1.getDriverContactRelationTable)(req, res);
}));
driverContactRelationTableRoute
    .route("/org/driver/contact/relation-table/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactRelationTableController_1.getDriverContactRelationTableById)(req, res);
}));
driverContactRelationTableRoute
    .route("/org/driver/contact/relation-table/delete/all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactRelationTableController_1.deleteAllDriverContactRelationTable)(req, res);
}));
driverContactRelationTableRoute
    .route("/org/driver/contact/relation-table/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactRelationTableController_1.deleteDriverContactRelationTableById)(req, res);
}));
