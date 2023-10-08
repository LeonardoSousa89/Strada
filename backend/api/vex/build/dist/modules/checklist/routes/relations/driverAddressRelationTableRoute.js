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
exports.driverAddressRelationTableRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverAddressRelationTableController_1 = require("../../controllers/driver/relations/driverAddressRelationTableController");
const driverAddressRelationTableRoute = express_1.default.Router();
exports.driverAddressRelationTableRoute = driverAddressRelationTableRoute;
driverAddressRelationTableRoute
    .route("/org/driver/address/relation-table/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressRelationTableController_1.saveDriverAddressRelationTable)(req, res);
}));
driverAddressRelationTableRoute
    .route("/org/driver/address/relation-table/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressRelationTableController_1.getDriverAddressRelationTable)(req, res);
}));
driverAddressRelationTableRoute
    .route("/org/driver/address/relation-table/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressRelationTableController_1.getDriverAddressRelationTableById)(req, res);
}));
driverAddressRelationTableRoute
    .route("/org/driver/address/relation-table/delete/all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressRelationTableController_1.deleteAllDriverAddressRelationTable)(req, res);
}));
driverAddressRelationTableRoute
    .route("/org/driver/address/relation-table/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressRelationTableController_1.deleteDriverAddressRelationTableById)(req, res);
}));
