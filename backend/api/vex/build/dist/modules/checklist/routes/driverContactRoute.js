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
exports.driverContactRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverContactController_1 = require("../controllers/driver/driverContactController");
const driverContactRoute = express_1.default.Router();
exports.driverContactRoute = driverContactRoute;
driverContactRoute.route("/org/driver/contact/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.saveDriverContact)(req, res);
}));
driverContactRoute
    .route("/org/driver/contact/update/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.updateDriverContact)(req, res);
}));
driverContactRoute
    .route("/org/driver/contact/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.getDriverContact)(req, res);
}));
driverContactRoute
    .route("/org/driver/contact/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.getDriverContactById)(req, res);
}));
driverContactRoute
    .route("/org/driver/contact/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.deleteAllDriverContact)(req, res);
}));
driverContactRoute
    .route("/org/driver/contact/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverContactController_1.deleteDriverContactById)(req, res);
}));
