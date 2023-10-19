// https://davibaltar.medium.com/documentação-automática-de-apis-em-node-js-eb03041c643b

const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./build/dist/modules/admin/routes/orgRoute.js",
  "./build/dist/modules/admin/routes/orgAddressRoute.js",
  "./build/dist/modules/admin/routes/orgContactRoute.js",
  "./build/dist/modules/admin/routes/orgIpDataProviderRoute.js",
  "./build/dist/modules/admin/routes/relations/orgAddressRelationTableRoute.js",
  "./build/dist/modules/admin/routes/relations/orgAndOrgIpDataProviderRelationTableRoute.js",
  "./build/dist/modules/admin/routes/relations/orgContactRelationTableRoute.js",
  "./build/dist/modules/admin/routes/relations/orgDriveRelationTableRoute.js",
  "./build/dist/modules/admin/routes/query/orgJoinQueryRoute.js",
  "./build/dist/modules/checklist/routes/driverRoute.js",
  "./build/dist/modules/checklist/routes/driverAddressRoute.js",
  "./build/dist/modules/checklist/routes/driverContactRoute.js",
  "./build/dist/modules/checklist/routes/driverDocumentRoute.js",
  "./build/dist/modules/checklist/routes/relations/driverAddressRelationTableRoute.js",
  "./build/dist/modules/checklist/routes/relations/driverContactRelationTableRoute.js",
  "./build/dist/modules/checklist/routes/relations/driverDocumentRelationTableRoute.js",
  "./build/dist/modules/checklist/routes/relations/driverInformationRelationTableRoute.js",
  "./build/dist/modules/checklist/routes/information/informationRoute.js",
  "./build/dist/modules/checklist/routes/information/midiaRoute.js",
  "./build/dist/modules/checklist/routes/information/relations/informationMidiaUriRelationTableRoute.js",
];

swaggerAutogen(outputFile, endpointsFiles);
