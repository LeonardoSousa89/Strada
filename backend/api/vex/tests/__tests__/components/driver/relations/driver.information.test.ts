import { app } from "../../../../../";
import { request } from "../../supertest/request.test";

import driverInformation from "../../../../mock/json/relations/driver/driver.information.json";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("POST /org/driver/information/save", function () {
//   it("Should save driver information", async function () {
//     const response = request(app)
//       .post("/org/driver/information/save")
//       .send(driverInformation);

//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");

//     expect((await response).status).toBe(201);
//   });
// });

// describe("GET /org/driver/information/get-al", function () {
//   it("Should get all driver information", async function () {
//     const response = request(app).get("/org/driver/information/get-all?page=1&size=10");

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("GET //org/driver/information/get-by-id/:id", function () {
//   it("Should get driver information by id", async function () {
//     const response = request(app).get(
//       "/org/driver/information/get-by-id/456632"
//     );

//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });

// describe("DELETE /org/driver/information/delete-all", function () {
//   it("Should delete driver information", async function () {
//     const response = request(app).delete("/org/driver/information/delete-all");

//     expect((await response).status).toBe(204);
//   });
// });

// describe("DELETE /org/driver/information/delete-by-id/:id", function () {
//   it("Should delete driver information by id", async function () {
//     const response = request(app).delete(
//       "/org/driver/information/delete-by-id/456634"
//     );

//     expect((await response).status).toBe(204);
//   });
// });
