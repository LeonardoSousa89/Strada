"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * testar somente a integração desejada e depois comentar, se tudo OK,
 * commitar[tudo deverá ser feito via esteira de pipeline com jenkins]
 */
// test suite
describe("", function () {
    it("", function () {
        return __awaiter(this, void 0, void 0, function* () { });
    });
});
// describe("POST /org/client/machine/data/provider/save", function () {
//   it("Should save org data machine and provider", async function () {
//     const response = request(app).post("/org/client/machine/data/provider/save").send(orgIpDataProvider);
//     // forçador de erro para verificar os campo,
//     // EX: campo nulo ou "", para assim podermos avaliar
//     // as respostas de erro na requisição.
//     // obs: o arquivo *.json, deve estar parametrizado com o erro
//     // na hora dos testes, campo nulo ou ""
//     // expect((await response).body).toBe("");
//     expect((await response).status).toBe(201);
//   });
// });
// describe("GET /org/client/machine/data/provider/get/all", function () {
//   it("Should get all org data machine and provider", async function () {
//     const response = request(app).get("/org/client/machine/data/provider/get/all?page=1&size=10");
//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });
// describe("GET /org/client/machine/data/provider/get/by/id/:id", function () {
//   it("Should get org data machine and provider by id", async function () {
//     const response = request(app).get("/org/client/machine/data/provider/get/by/id/52");
//     expect((await response).body.data.data.length).toBeGreaterThan(0);
//     expect((await response).status).toBe(200);
//   });
// });
// describe("DELETE /org/client/machine/data/provider/delete/by/id/:id", function () {
//   it("Should delete org data machine and provider by id", async function () {
//     const response = request(app).delete("/org/client/machine/data/provider/delete/by/id/52");
//     expect((await response).status).toBe(204);
//   });
// });
