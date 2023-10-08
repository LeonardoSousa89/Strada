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
exports.orgIpDataProviderRoute = void 0;
const express_1 = __importDefault(require("express"));
const orgIpDataProviderController_1 = require("../controllers/org/orgIpDataProviderController");
const orgIpDataProviderRoute = express_1.default.Router();
exports.orgIpDataProviderRoute = orgIpDataProviderRoute;
orgIpDataProviderRoute
    .route("/org/client/machine/data/provider/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgIpDataProviderController_1.saveOrgIpDataProvider)(req, res);
}));
orgIpDataProviderRoute
    .route("/org/client/machine/data/provider/get/all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgIpDataProviderController_1.getOrgIpDataProvider)(req, res);
}));
orgIpDataProviderRoute
    .route("/org/client/machine/data/provider/get/by/id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgIpDataProviderController_1.getOrgIpDataProviderById)(req, res);
}));
orgIpDataProviderRoute
    .route("/org/client/machine/data/provider/delete/by/id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgIpDataProviderController_1.deleteOrgIpDataProviderById)(req, res);
}));
