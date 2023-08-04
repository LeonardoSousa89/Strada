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
const driverDocumentController_1 = require("./controllers/driver/driverDocumentController");
const informationController_1 = require("./controllers/driver/information/informationController");
const driverAddressRelationTableController_1 = require("./controllers/driver/relations/driverAddressRelationTableController");
const driverContactRelationTableController_1 = require("./controllers/driver/relations/driverContactRelationTableController");
const driverDocumentRelationTableController_1 = require("./controllers/driver/relations/driverDocumentRelationTableController");
const driverInformationRelationTableController_1 = require("./controllers/driver/relations/driverInformationRelationTableController");
const testsController_1 = require("./__tests__/functions/server/testsController");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', [
    testsController_1.orgTestsController,
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
    driverDocumentController_1.driverDocumentController,
    informationController_1.informationController,
    driverAddressRelationTableController_1.driverAddressRelationTableController,
    driverContactRelationTableController_1.driverContactRelationTableController,
    driverDocumentRelationTableController_1.driverDocumentRelationTableController,
    driverInformationRelationTableController_1.driverInformationRelationTableController
]);
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    const serve = app.listen(port);
    console.table({
        network: serve.address(),
        maxListeners: serve.getMaxListeners()
    });
});
server();
