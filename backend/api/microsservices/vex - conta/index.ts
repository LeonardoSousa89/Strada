var port = [8765, 80, 8080, 8181];

import morgan from "morgan";
import express from "express";

import { orgController } from "./controllers/org/orgController";
import { OrgJoinQueryController } from "./controllers/query/orgJoinQueryController";
import { orgAddressController } from "./controllers/org/orgAddressController";
import { orgContactController } from "./controllers/org/orgContactController";
import { orgAddressRelationTableController } from "./controllers/org/relations/orgAddressRelationTableController";
import { orgContactRelationTableController } from "./controllers/org/relations/orgContactRelationTableController";
import { orgDriverRelationTableController } from "./controllers/relations/orgDriverRelationTableController";
import { driverController } from "./controllers/driver/driverController";
import { driverAddressController } from "./controllers/driver/driverAddressController";
import { driverContactController } from "./controllers/driver/driverContactController";
import { driverDocumentController } from "./controllers/driver/driverDocumentController";
import { informationController } from "./controllers/driver/information/informationController";
import { driverAddressRelationTableController } from "./controllers/driver/relations/driverAddressRelationTableController";
import { driverContactRelationTableController } from "./controllers/driver/relations/driverContactRelationTableController";
import { driverDocumentRelationTableController } from "./controllers/driver/relations/driverDocumentRelationTableController";
import { driverInformationRelationTableController } from "./controllers/driver/relations/driverInformationRelationTableController";
import { orgTestsController } from "./__tests__/functions/server/testsController";

import RedisOperations from "./repositories/redis/cache/services/redis.cache.operation";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", [
  orgTestsController,
  orgController,
  OrgJoinQueryController,
  orgAddressController,
  orgContactController,
  orgAddressRelationTableController,
  orgContactRelationTableController,
  orgDriverRelationTableController,
  driverController,
  driverAddressController,
  driverContactController,
  driverDocumentController,
  informationController,
  driverAddressRelationTableController,
  driverContactRelationTableController,
  driverDocumentRelationTableController,
  driverInformationRelationTableController,
]);

const server = async () => {
  
  await new RedisOperations().connection();

  const serve = app.listen(port[0]);

  console.table({
    port_range: port,
    port_in_use: port[0],
    network: serve.address(),
    maxListeners: serve.getMaxListeners(),
  });
};

server();
