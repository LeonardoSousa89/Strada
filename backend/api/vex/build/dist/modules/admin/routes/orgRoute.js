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
exports.orgRoute = void 0;
const express_1 = __importDefault(require("express"));
const orgController_1 = require("../controllers/org/orgController");
const cnpjController_1 = require("../controllers/org/cnpj/cnpjController");
const orgRoute = express_1.default.Router();
exports.orgRoute = orgRoute;
orgRoute.route("/org/verify-cnpj").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.verifyCnpj)(req, res);
}));
orgRoute.route("/org/get/data/cnpj").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cnpjController_1.getCnpj)(req, res, req.query.cnpj);
}));
orgRoute.route("/org/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.saveOrg)(req, res);
}));
orgRoute.route("/org/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.updateOrg)(req, res);
}));
orgRoute.route("/org/get-all").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.getOrg)(req, res);
}));
orgRoute.route("/org/get-by-id/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.getOrgById)(req, res);
}));
orgRoute.route("/org/delete-by-id/:id").delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgController_1.deleteOrgById)(req, res);
}));
