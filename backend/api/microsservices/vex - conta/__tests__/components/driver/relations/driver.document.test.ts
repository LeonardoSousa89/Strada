import { app } from "../../../../";
import { request } from "../../supertest/request.test";

import driverDocument from "../../../../mock/json/relations/driver/driver.document.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/driver/document/save", function () {
//   it("Should save driver document", async function () {
//     const response = request(app).post("/org/driver/document/save").send(driverDocument);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("PUT /org/driver/document/update", function () {
//   it("Should update driver document", async function () {
//     const response = request(app)
//       .put("/org/driver/document/update/20")
//       .send(driverDocument);

//     // forçador de erro para verificar os campos,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/driver/document/get-all", function () {
//   it("Should get all driver document", async function () {
//     const response = request(app).get("/org/driver/document/get-all?page=1&size=10");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/driver/document/get-by-id/:id", function () {
//   it("Should get driver document by id", async function () {
//     const response = request(app).get("/org/driver/document/get-by-id/21");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/driver/document/delete-all", function () {
//   it("Should delete driver document", async function () {
//     const response = request(app).delete("/org/driver/document/delete-all");

//     expect((await response).status).toBe(204);
//   });
// });

// describe("DELETE /org/driver/document/delete-by-id/:id", function () {
//   it("Should delete driver document by id", async function () {
//     const response = request(app).delete("/org/driver/document/delete-by-id/21");

//     expect((await response).status).toBe(204);
//   });
// });
