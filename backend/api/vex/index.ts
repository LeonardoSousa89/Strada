var port = [8765, 80, 8080, 8181];

import morgan from "morgan";
import express from "express";

// import { orgTestsController } from "./tests/mock/server/testsController";

import { orgRoute } from "./modules/admin/routes/orgRoute";
import { orgJoinQueryRoute } from "./modules/admin/routes/query/orgJoinQueryRoute";
import { orgAddressRoute } from "./modules/admin/routes/orgAddressRoute";
import { orgContactRoute } from "./modules/admin/routes/orgContactRoute";
import { orgAddressRelationTableRoute } from "./modules/admin/routes/relations/orgAddressRelationTableRoute";
import { orgContactRelationTableRoute } from "./modules/admin/routes/relations/orgContactRelationTableRoute";
import { orgDriverRelationTableRoute } from "./modules/admin/routes/relations/orgDriveRelationTableRoute";
import { driverRoute } from "./modules/checklist/routes/driverRoute";
import { driverAddressRoute } from "./modules/checklist/routes/driverAddressRoute";
import { driverContactRoute } from "./modules/checklist/routes/driverContactRoute";
import { driverDocumentRoute } from "./modules/checklist/routes/driverDocumentRoute";
import { informationRoute } from "./modules/checklist/routes/information/informationRoute";
import { midiaRoute } from "./modules/checklist/routes/information/midiaRoute";
import { driverAddressRelationTableRoute } from "./modules/checklist/routes/relations/driverAddressRelationTableRoute";
import { driverContactRelationTableRoute } from "./modules/checklist/routes/relations/driverContactRelationTableRoute";
import { driverDocumentRelationTableRoute } from "./modules/checklist/routes/relations/driverDocumentRelationTableRoute";
import { driverInformationRelationTableRoute } from "./modules/checklist/routes/relations/driverInformationRelationTableRoute";
import { orgIpDataProviderRoute } from "./modules/admin/routes/orgIpDataProviderRoute";
import { orgAndOrgIpDataProviderRelationTableRoute } from "./modules/admin/routes/relations/orgAndOrgIpDataProviderRelationTableRoute";
import { informationMidiaUriRelationTableRoute } from "./modules/checklist/routes/information/relations/InformationMidiaUriRelationTableRoute";

import RedisOperations from "./repositories/redis/cache/services/redis.cache.operation";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", [
  // orgTestsController,
  orgRoute,
  orgJoinQueryRoute,
  orgAddressRoute,
  orgContactRoute,
  orgIpDataProviderRoute,
  orgAddressRelationTableRoute,
  orgContactRelationTableRoute,
  orgAndOrgIpDataProviderRelationTableRoute,
  orgDriverRelationTableRoute,
  driverRoute,
  driverAddressRoute,
  driverContactRoute,
  driverDocumentRoute,
  informationRoute,
  midiaRoute,
  driverAddressRelationTableRoute,
  driverContactRelationTableRoute,
  driverDocumentRelationTableRoute,
  driverInformationRelationTableRoute,
  informationMidiaUriRelationTableRoute
]);

const server = async () => {
  
  await new RedisOperations().connection();

  let serve:any

  if(process.env.NODE_ENV !== 'test'){

    serve = app.listen(port[0]);
  }

  // desabilitar a tabela de rede durante os testes[gera bugs]
  
  console.table({
    port_range: port,
    port_in_use: port[3],
    network: serve.address(),
    maxListeners: serve.getMaxListeners(),
  });
};

server();

//para uso em testes
// export { app }
