import { app } from "../../../../../";
import { request } from "../../supertest/request.test";

import driverAddress from "../../../../mock/json/relations/driver/driver.address.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/driver/address/save", function () {
//   it("Should save driver address", async function () {
//     const response = request(app).post("/org/driver/address/save").send(driverAddress);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("PUT /org/driver/address/update", function () {
//   it("Should update driver address", async function () {
//     const response = request(app).put("/org/driver/address/update/27").send(driverAddress);

//         // forçador de erro para verificar os campos,
//         // EX: campo nulo ou "", para assim podermos avaliar
//         // as respostas de erro na requisição.
//         // obs: o arquivo *.json, deve estar parametrizado com o erro
//         // na hora dos testes, campo nulo ou ""
//         // expect((await response).body).toBe("");

//         expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/driver/address/get-all", function () {
//   it("Should get all driver address", async function () {
//     const response = request(app).get("/org/driver/address/get-all?page=1&size=10");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/driver/address/get-by-id/:id", function () {
//   it("Should get driver address by id", async function () {
//     const response = request(app).get("/org/driver/address/get-by-id/27");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/driver/address/delete-all", function () {
//   it("Should delete driver address", async function () {
//     const response = request(app).delete("/org/driver/address/delete-all");

//     expect((await response).status).toBe(204);
//   });
// });

// describe("DELETE /org/driver/address/delete-by-id/:id", function () {
//   it("Should delete driver address by id", async function () {
//     const response = request(app).delete("/org/driver/address/delete-by-id/28");

//     expect((await response).status).toBe(204);
//   });
// });
