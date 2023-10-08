import { app } from "../../../../../..";
import { request } from "../../../supertest/request.test";

import orgIpDataProviderRelationship from "../../../../../mock/json/relations/org/relationship/orgIpDataProviderRelationship.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/machine/client/ip/and/provider/relation-table/save", function () {
//   it("Should save data machine relation", async function () {
//     const response = request(app)
//       .post("/org/machine/client/ip/and/provider/relation-table/save")
//       .send(orgIpDataProviderRelationship);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/machine/client/ip/and/provider/relation-table/get-all", function () {
//   it("Should get all data machine relation", async function () {
//     const response = request(app).get("/org/machine/client/ip/and/provider/relation-table/get-all");

//     expect((await response).body.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/machine/client/ip/and/provider/relation-table/get/by/id/:id", function () {
//   it("Should get data machine relation by id", async function () {
//     const response = request(app).get("/org/machine/client/ip/and/provider/relation-table/get/by/id/5");

//     expect((await response).body.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/machine/client/ip/and/provider/relation-table/delete/all", function () {
//   it("Should delete data machine relation by id", async function () {
//     const response = request(app).delete("/org/machine/client/ip/and/provider/relation-table/delete/all");

//     expect((await response).status).toBe(204);
//   });
// });

// describe("DELETE /org/machine/client/ip/and/provider/relation-table/delete/by/id/:id", function () {
//   it("Should delete data machine relation by id", async function () {
//     const response = request(app).delete("/org/machine/client/ip/and/provider/relation-table/delete/by/id/6");

//     expect((await response).status).toBe(204);
//   });
// });
