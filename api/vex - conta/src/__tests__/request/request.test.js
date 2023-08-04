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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDataTest2 = exports.loadDataTest = void 0;
const axios_1 = __importDefault(require("axios"));
/**
 *
 * neste momento foi testado a carga suportada atual pela api,
 * 40 requisições/s de leitura e gravação diretos no banco de
 * dados, com a inserção do banco de caching, seu suporte,
 * disponibilidade e velocidade, aumentaram consideravelmente.
 *
 * dependendo dos testes atuais o app já possui capacidade para atender
 * entre 2 a 5 empresas pequenas de logística com o módulo de checklist
 */
// 20 requisições/s, comunicação direta com o banco de dados [leitura]
function loadDataTest() {
    const request = setInterval(() => __awaiter(this, void 0, void 0, function* () {
        const org1 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org2 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org3 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org4 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org5 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org6 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org7 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org8 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org9 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org10 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org11 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org12 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org13 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org14 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org15 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org16 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org17 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org18 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org19 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        const org20 = yield axios_1.default.get('http://localhost:8765/org/join/data?org_id=45');
        return {
            requestTest: {
                data: {
                    org1: org1.status,
                    org2: org2.status,
                    org3: org3.status,
                    org4: org4.status,
                    org5: org5.status,
                    org6: org6.status,
                    org7: org7.status,
                    org8: org8.status,
                    org9: org9.status,
                    org10: org10.status,
                    org11: org11.status,
                    org12: org12.status,
                    org13: org13.status,
                    org14: org14.status,
                    org15: org15.status,
                    org16: org16.status,
                    org17: org17.status,
                    org18: org18.status,
                    org19: org19.status,
                    org20: org20.status
                }
            }
        };
    }), 1000);
    return request;
}
exports.loadDataTest = loadDataTest;
// 20 requisições/s direto do banco de dados [gravação]
function loadDataTest2() {
    const request = setInterval(() => __awaiter(this, void 0, void 0, function* () {
        const data1 = {
            starting_km: "89568",
            final_km: null,
            plate: "rdn-7d95",
            notes: "**"
        };
        const data2 = {
            starting_km: null,
            final_km: "98568",
            plate: "rdn-7d95",
            notes: "pneu careca!"
        };
        const org1 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org11 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org2 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org12 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org3 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org13 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org4 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org14 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org5 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org15 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org6 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org16 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org7 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org17 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org8 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org18 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org9 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org19 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        const org10 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data1);
        const org20 = yield axios_1.default.post('http://localhost:8765/org/driver/information/save', data2);
        return {
            requestTest: {
                data: {
                    org1: org1.status,
                    org2: org2.status,
                    org3: org3.status,
                    org4: org4.status,
                    org5: org5.status,
                    org6: org6.status,
                    org7: org7.status,
                    org8: org8.status,
                    org9: org9.status,
                    org10: org10.status,
                    org11: org11.status,
                    org12: org12.status,
                    org13: org13.status,
                    org14: org14.status,
                    org15: org15.status,
                    org16: org16.status,
                    org17: org17.status,
                    org18: org18.status,
                    org19: org19.status,
                    org20: org20.status
                }
            }
        };
    }), 1000);
    return request;
}
exports.loadDataTest2 = loadDataTest2;
