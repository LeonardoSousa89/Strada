import { app } from "../../../..";
import { request } from "../../supertest/request.test";

/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */

// test suite
describe("", function () {
  it("", async function () {});
});

// describe("GET /org/join/data?org_id=id", function () {
//   it("Should get driver data join with others controllers by id", async function () {
//     const response = request(app).get("/org/join/data?org_id=235");

//     expect((await response).body.data.data.data.organization).not.toBeNull();
//     expect((await response).status).toBe(200);
//   });
// });
