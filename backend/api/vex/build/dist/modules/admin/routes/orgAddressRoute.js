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
exports.orgAddressRoute = void 0;
const express_1 = __importDefault(require("express"));
const orgAddressController_1 = require("../controllers/org/orgAddressController");
const orgAddressRoute = express_1.default.Router();
exports.orgAddressRoute = orgAddressRoute;
orgAddressRoute.route("/org/address/save").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgAddressController_1.saveOrgAddress)(req, res);
}));
orgAddressRoute.route("/org/address/update/:id").put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgAddressController_1.updateOrgAddress)(req, res);
}));
orgAddressRoute.route("/org/address/get-all").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgAddressController_1.getOrgAddress)(req, res);
}));
orgAddressRoute.route("/org/address/get-by-id/:id").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgAddressController_1.getOrgAddressById)(req, res);
}));
orgAddressRoute
    .route("/org/address/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgAddressController_1.deleteOrgAddressById)(req, res);
}));
