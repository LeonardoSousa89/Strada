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
var port = [8765, 80, 8080, 8181];
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
// import { orgTestsController } from "./tests/mock/server/testsController";
const orgRoute_1 = require("./modules/admin/routes/orgRoute");
const orgJoinQueryRoute_1 = require("./modules/admin/routes/query/orgJoinQueryRoute");
const orgAddressRoute_1 = require("./modules/admin/routes/orgAddressRoute");
const orgContactRoute_1 = require("./modules/admin/routes/orgContactRoute");
const orgAddressRelationTableRoute_1 = require("./modules/admin/routes/relations/orgAddressRelationTableRoute");
const orgContactRelationTableRoute_1 = require("./modules/admin/routes/relations/orgContactRelationTableRoute");
const orgDriveRelationTableRoute_1 = require("./modules/admin/routes/relations/orgDriveRelationTableRoute");
const driverRoute_1 = require("./modules/checklist/routes/driverRoute");
const driverAddressRoute_1 = require("./modules/checklist/routes/driverAddressRoute");
const driverContactRoute_1 = require("./modules/checklist/routes/driverContactRoute");
const driverDocumentRoute_1 = require("./modules/checklist/routes/driverDocumentRoute");
const informationRoute_1 = require("./modules/checklist/routes/information/informationRoute");
const midiaRoute_1 = require("./modules/checklist/routes/information/midiaRoute");
const driverAddressRelationTableRoute_1 = require("./modules/checklist/routes/relations/driverAddressRelationTableRoute");
const driverContactRelationTableRoute_1 = require("./modules/checklist/routes/relations/driverContactRelationTableRoute");
const driverDocumentRelationTableRoute_1 = require("./modules/checklist/routes/relations/driverDocumentRelationTableRoute");
const driverInformationRelationTableRoute_1 = require("./modules/checklist/routes/relations/driverInformationRelationTableRoute");
const orgIpDataProviderRoute_1 = require("./modules/admin/routes/orgIpDataProviderRoute");
const orgAndOrgIpDataProviderRelationTableRoute_1 = require("./modules/admin/routes/relations/orgAndOrgIpDataProviderRelationTableRoute");
const InformationMidiaUriRelationTableRoute_1 = require("./modules/checklist/routes/information/relations/InformationMidiaUriRelationTableRoute");
const redis_cache_operation_1 = __importDefault(require("./repositories/redis/cache/services/redis.cache.operation"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", [
    // orgTestsController,
    orgRoute_1.orgRoute,
    orgJoinQueryRoute_1.orgJoinQueryRoute,
    orgAddressRoute_1.orgAddressRoute,
    orgContactRoute_1.orgContactRoute,
    orgIpDataProviderRoute_1.orgIpDataProviderRoute,
    orgAddressRelationTableRoute_1.orgAddressRelationTableRoute,
    orgContactRelationTableRoute_1.orgContactRelationTableRoute,
    orgAndOrgIpDataProviderRelationTableRoute_1.orgAndOrgIpDataProviderRelationTableRoute,
    orgDriveRelationTableRoute_1.orgDriverRelationTableRoute,
    driverRoute_1.driverRoute,
    driverAddressRoute_1.driverAddressRoute,
    driverContactRoute_1.driverContactRoute,
    driverDocumentRoute_1.driverDocumentRoute,
    informationRoute_1.informationRoute,
    midiaRoute_1.midiaRoute,
    driverAddressRelationTableRoute_1.driverAddressRelationTableRoute,
    driverContactRelationTableRoute_1.driverContactRelationTableRoute,
    driverDocumentRelationTableRoute_1.driverDocumentRelationTableRoute,
    driverInformationRelationTableRoute_1.driverInformationRelationTableRoute,
    InformationMidiaUriRelationTableRoute_1.informationMidiaUriRelationTableRoute
]);
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    yield new redis_cache_operation_1.default().connection();
    let serve;
    if (process.env.NODE_ENV !== 'test') {
        serve = app.listen(port[0]);
    }
    // desabilitar a tabela de rede durante os testes[gera bugs]
    console.table({
        port_range: port,
        port_in_use: port[3],
        network: serve.address(),
        maxListeners: serve.getMaxListeners(),
    });
});
server();
//para uso em testes
// export { app }
