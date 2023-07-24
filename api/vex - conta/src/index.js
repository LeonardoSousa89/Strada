"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var port = 8765;
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const orgController_1 = require("./controllers/org/orgController");
const driverController_1 = require("./controllers/driver/driverController");
const orgAddressController_1 = require("./controllers/org/orgAddressController");
const orgContactController_1 = require("./controllers/org/orgContactController");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', [
    orgController_1.orgController,
    orgAddressController_1.orgAddressController,
    orgContactController_1.orgContactController,
    driverController_1.driverController
]);
app.listen(port);
