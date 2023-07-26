"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var port = 8765;
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const orgController_1 = require("./controllers/org/orgController");
const orgJoinQueryController_1 = require("./controllers/query/orgJoinQueryController");
const orgAddressController_1 = require("./controllers/org/orgAddressController");
const orgContactController_1 = require("./controllers/org/orgContactController");
const orgAddressRelationTableController_1 = require("./controllers/org/relations/orgAddressRelationTableController");
const orgContactRelationTableController_1 = require("./controllers/org/relations/orgContactRelationTableController");
const orgDriverRelationTableController_1 = require("./controllers/relations/orgDriverRelationTableController");
const driverController_1 = require("./controllers/driver/driverController");
const driverAddressController_1 = require("./controllers/driver/driverAddressController");
const driverContactController_1 = require("./controllers/driver/driverContactController");
const driverAddressRelationTableController_1 = require("./controllers/driver/relations/driverAddressRelationTableController");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', [
    orgController_1.orgController,
    orgJoinQueryController_1.OrgJoinQueryController,
    orgAddressController_1.orgAddressController,
    orgContactController_1.orgContactController,
    orgAddressRelationTableController_1.orgAddressRelationTableController,
    orgContactRelationTableController_1.orgContactRelationTableController,
    orgDriverRelationTableController_1.orgDriverRelationTableController,
    driverController_1.driverController,
    driverAddressController_1.driverAddressController,
    driverContactController_1.driverContactController,
    driverAddressRelationTableController_1.driverAddressRelationTableController
]);
app.listen(port);
