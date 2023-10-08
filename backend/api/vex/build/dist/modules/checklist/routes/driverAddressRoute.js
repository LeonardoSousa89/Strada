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
exports.driverAddressRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverAddressController_1 = require("../controllers/driver/driverAddressController");
const driverAddressRoute = express_1.default.Router();
exports.driverAddressRoute = driverAddressRoute;
driverAddressRoute
    .route("/org/driver/address/search/zip-code")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.getZipCode)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.saveDriverAddress)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/update/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.updateDriverAddress)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.getDriverAddress)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.getDriverAddressById)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.deleteAllDriverAddress)(req, res);
}));
driverAddressRoute
    .route("/org/driver/address/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverAddressController_1.deleteDriverAddressById)(req, res);
}));
