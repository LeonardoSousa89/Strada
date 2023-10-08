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
exports.informationRoute = void 0;
const express_1 = __importDefault(require("express"));
const informationController_1 = require("../../controllers/driver/information/informationController");
const informationRoute = express_1.default.Router();
exports.informationRoute = informationRoute;
informationRoute
    .route("/org/driver/information/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, informationController_1.saveInformation)(req, res);
}));
informationRoute
    .route("/org/driver/information/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, informationController_1.getInformation)(req, res);
}));
informationRoute
    .route("/org/driver/information/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, informationController_1.getInformationById)(req, res);
}));
informationRoute
    .route("/org/driver/information/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, informationController_1.deleteAllInformation)(req, res);
}));
informationRoute
    .route("/org/driver/information/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, informationController_1.deleteInformationById)(req, res);
}));
