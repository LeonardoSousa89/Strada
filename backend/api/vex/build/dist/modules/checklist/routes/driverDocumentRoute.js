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
exports.driverDocumentRoute = void 0;
const express_1 = __importDefault(require("express"));
const driverDocumentController_1 = require("../controllers/driver/driverDocumentController");
const driverDocumentRoute = express_1.default.Router();
exports.driverDocumentRoute = driverDocumentRoute;
driverDocumentRoute
    .route("/org/driver/document/save")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.saveDriverDocument)(req, res);
}));
driverDocumentRoute
    .route("/org/driver/document/update/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.updateDriverDocument)(req, res);
}));
driverDocumentRoute
    .route("/org/driver/document/get-all")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.getDriverDocument)(req, res);
}));
driverDocumentRoute
    .route("/org/driver/document/get-by-id/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.getDriverDocumentById)(req, res);
}));
driverDocumentRoute
    .route("/org/driver/document/delete-all")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.deleteAllDriverDocument)(req, res);
}));
driverDocumentRoute
    .route("/org/driver/document/delete-by-id/:id")
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, driverDocumentController_1.deleteDriverDocumentById)(req, res);
}));
