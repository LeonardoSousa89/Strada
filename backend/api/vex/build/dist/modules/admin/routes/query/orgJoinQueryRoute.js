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
exports.orgJoinQueryRoute = void 0;
const express_1 = __importDefault(require("express"));
const orgJoinQueryController_1 = require("../../controllers/org/query/orgJoinQueryController");
const orgJoinQueryRoute = express_1.default.Router();
exports.orgJoinQueryRoute = orgJoinQueryRoute;
orgJoinQueryRoute.route("/org/join/data").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, orgJoinQueryController_1.getOrgJoinQuery)(req, res);
}));
