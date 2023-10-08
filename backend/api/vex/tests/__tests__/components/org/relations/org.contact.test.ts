import { app } from "../../../../..";
import { request } from "../../supertest/request.test";

import orgContact from "../../../../mock/json/relations/org/org.contact.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/contact/save", function () {
//   it("Should save org contact", async function () {
//     const response = request(app).post("/org/contact/save").send(orgContact);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("PUT /org/contact/update", function () {
//   it("Should update org contact", async function () {
//     const response = request(app).put("/org/contact/update/35").send(orgContact);

//         // forçador de erro para verificar os campos,
//         // EX: campo nulo ou "", para assim podermos avaliar
//         // as respostas de erro na requisição.
//         // obs: o arquivo *.json, deve estar parametrizado com o erro
//         // na hora dos testes, campo nulo ou ""
//         // expect((await response).body).toBe("");

//         expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/contact/get-all", function () {
//   it("Should get all org contact", async function () {
//     const response = request(app).get("/org/contact/get-all?page=1&size=10");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/contact/get-by-id/:id", function () {
//   it("Should get org contact by id", async function () {
//     const response = request(app).get("/org/contact/get-by-id/29");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/contact/delete-by-id/:id", function () {
//   it("Should delete org contact by id", async function () {
//     const response = request(app).delete("/org/contact/delete-by-id/29");

//     expect((await response).status).toBe(204);
//   });
// });
