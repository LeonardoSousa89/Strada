import { app } from "../../../..";
import { request } from "../supertest/request.test";

import org from "../../../mock/json/org.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

  // describe("POST /org/save", function () {
  //   it("Should save org", async function () {
  //     const response = request(app).post("/org/save").send(org);
        
  //         // forçador de erro para verificar os campo, 
  //         // EX: campo nulo ou "", para assim podermos avaliar 
  //         // as respostas de erro na requisição.
  //         // obs: o arquivo *.json, deve estar parametrizado com o erro 
  //         // na hora dos testes, campo nulo ou ""
  //         // expect((await response).body).toBe("");

  //     expect((await response).status).toBe(201);
  //   });
  // });

// describe("PUT /org/update", function () {
//   it("Should update org", async function () {
//     const response = request(app).put("/org/update/235").send(org);
        
//         // forçador de erro para verificar os campos, 
//         // EX: campo nulo ou "", para assim podermos avaliar 
//         // as respostas de erro na requisição.
//         // obs: o arquivo *.json, deve estar parametrizado com o erro 
//         // na hora dos testes, campo nulo ou ""
//         // expect((await response).body).toBe("");

//         expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/get-all", function () {
//   it("Should get all drivers", async function () {
//     const response = request(app).get("/org/get-all?page=1&size=10");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET /org/get-by-id/:id", function () {
//   it("Should get org by id", async function () {
//     const response = request(app).get("/org/get-by-id/235");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/delete-by-id/:id", function () {
//   it("Should delete org by id", async function () {
//     const response = request(app).delete("/org/delete-by-id/234");

//     expect((await response).status).toBe(204);
//   });
// });
