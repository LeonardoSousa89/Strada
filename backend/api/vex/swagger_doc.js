const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./docs/api/swagger/swagger_output.json");
const express = require("express");
const app = express();

app.use("/vex/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3000);
