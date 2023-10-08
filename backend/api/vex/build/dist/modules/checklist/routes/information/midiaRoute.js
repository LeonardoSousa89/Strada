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
exports.midiaRoute = void 0;
const express_1 = __importDefault(require("express"));
const midiaController_1 = require("../../controllers/driver/information/midiaController");
const midiaRoute = express_1.default.Router();
exports.midiaRoute = midiaRoute;
midiaRoute
    .route("/org/driver/information/midia/uri/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, midiaController_1.saveMidia)(req, res);
}));
midiaRoute
    .route("/org/driver/information/midia/uri/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, midiaController_1.getMidia)(req, res);
}));
midiaRoute
    .route("/org/driver/information/midia/uri/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, midiaController_1.getMidiaById)(req, res);
}));
midiaRoute
    .route("/org/driver/information/midia/uri/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, midiaController_1.deleteAllMidia)(req, res);
}));
midiaRoute
    .route("/org/driver/information/midia/uri/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, midiaController_1.deleteMidiaById)(req, res);
}));
