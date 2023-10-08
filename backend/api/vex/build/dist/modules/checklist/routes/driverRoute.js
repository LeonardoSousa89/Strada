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
exports.driverRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driver/driverController");
const driverRoute = express_1.default.Router();
exports.driverRoute = driverRoute;
driverRoute.route("/org/driver/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.saveDriver)(req, res);
}));
driverRoute.route("/org/driver/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.updateDriver)(req, res);
}));
driverRoute.route("/org/driver/get-all").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.getDriver)(req, res);
}));
driverRoute.route("/org/driver/get-by-id/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.getDriverById)(req, res);
}));
driverRoute.route("/org/driver/delete-all").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.deleteAllDriver)(req, res);
}));
driverRoute.route("/org/driver/delete-by-id/:id").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverController_1.deleteDriverById)(req, res);
}));
