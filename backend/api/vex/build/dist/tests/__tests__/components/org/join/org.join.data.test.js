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
const __1 = require("../../../..");
const request_test_1 = require("../../supertest/request.test");
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
describe("GET /org/join/data?org_id=id", function () {
    it("Should get driver data join with others controllers by id", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = (0, request_test_1.request)(__1.app).get("/org/join/data?org_id=235");
            // expect((await response).body).toBe("");
            expect((yield response).body.data.data.data.organization).not.toBeNull();
            expect((yield response).status).toBe(200);
        });
    });
});
