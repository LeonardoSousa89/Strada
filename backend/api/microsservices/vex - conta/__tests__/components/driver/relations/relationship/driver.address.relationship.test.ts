import { app } from "../../../../..";
import { request } from "../../../supertest/request.test";

import driverAddressRelationship from "../../../../../mock/json/relations/driver/relationship/driverAddressRelationship.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/driver/address/relation-table/save", function () {
//   it("Should save driver address relation", async function () {
//     const response = request(app)
//       .post("/org/driver/address/relation-table/save")
//       .send(driverAddressRelationship);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/driver/address/relation-table/get-all", function () {
//   it("Should get all driver address relation", async function () {
//     const response = request(app).get("/org/driver/address/relation-table/get-all");

//     expect((await response).body.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/driver/address/relation-table/get/by/id/:id", function () {
//   it("Should get driver address relation by id", async function () {
//     const response = request(app).get("/org/driver/address/relation-table/get/by/id/13");

//     expect((await response).body.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/driver/address/relation-table/delete/all", function () {
//   it("Should delete driver address relation by id", async function () {
//     const response = request(app).delete("/org/driver/address/relation-table/delete/all");

//     expect((await response).status).toBe(204);
//   });
// });

// describe("DELETE /org/driver/address/relation-table/delete/by/id/:id", function () {
//   it("Should delete driver address relation by id", async function () {
//     const response = request(app).delete("/org/driver/address/relation-table/delete/by/id/14");

//     expect((await response).status).toBe(204);
//   });
// });
