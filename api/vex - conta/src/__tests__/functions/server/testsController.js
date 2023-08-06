"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.orgTestsController = void 0;
const express_1 = __importDefault(require("express"));
const handleError_1 = __importDefault(require("../../../interface/error/handleError"));
const dotenv = __importStar(require("dotenv"));
const request_test_1 = require("../../request/request.test");
const redis_1 = require("../../cache/redis");
const orgJoinQueryService_1 = __importDefault(require("../../../services/query/orgJoinQueryService"));
dotenv.config();
const orgTestsController = express_1.default.Router();
exports.orgTestsController = orgTestsController;
const err = new handleError_1.default();
//teste de cargas
orgTestsController.route('/tests').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = testDeleteByTimeInformation()
        // console.log(data)
        // 40  requisições/s direto do banco de dados [gravação e leitura]
        const request = (0, request_test_1.loadDataTest)();
        console.log(request);
        const request2 = (0, request_test_1.loadDataTest2)();
        console.log(request2);
        return res.status(200).json({ tests: 'testing Ok!' });
    }
    catch (__) {
        return res.status(500).json({ error: 'ops! there is an error' });
    }
}));
// testes de performance com cache utilizando o db redis
orgTestsController.route('/tests/redis-cache/on-storage').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redis_1.connection)();
        yield (0, redis_1.setCache)(req.body.key, req.body.value, req.body.expiration);
        res.status(201).json({ msg: 'cache on storage' });
        yield (0, redis_1.disconnection)();
        return;
    }
    catch (__) {
        return res.status(500).json({ error: 'ops! there is an error' });
    }
})).get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redis_1.connection)();
        const cache = yield (0, redis_1.getCache)(req.query.cache);
        res.status(200).json(cache);
        yield (0, redis_1.disconnection)();
        return;
    }
    catch (__) {
        return res.status(500).json({ error: 'ops! there is an error' });
    }
}));
orgTestsController.route('/tests/redis-cache/get/org/data/:id').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, redis_1.connection)();
        const orgDataFromCache = yield (0, redis_1.getCache)(`org_data_${req.params.id}`);
        if (orgDataFromCache) {
            const data = JSON.parse(orgDataFromCache);
            res.status(200).json({
                data: {
                    inCache: 'yes',
                    data
                }
            });
            yield (0, redis_1.disconnection)();
            return;
        }
        const query = new orgJoinQueryService_1.default();
        const data = yield query.getById(Number(req.params.id));
        if (data.data.organization.length === 0) {
            res.status(404)
                .json({
                msg: 'no data'
            });
            yield (0, redis_1.disconnection)();
            return;
        }
        // 60 * 60 * 24 * 7 (expiration: 7 dias)
        //a lógica é a seguinte: a informação será salva,
        // na api de registro, no database de registro e no banco de cache
        // o usuário de nível gratuito, somente acessará os dados em cache,
        // com ttl equivalente a 1 semana, após isso os dados em cache serão 
        // eliminados e a API de registro somente será acessível a administração
        // do app, para fins de consulta ou jurídico, será eliminar primeiro a
        // associação da informação e logo após a informação, ambos estarão 
        // em cache
        yield (0, redis_1.setCache)(`org_data_${req.params.id}`, JSON.stringify(data), 300);
        // neste ponto a tentativa de parse levaria a erros continuos,
        // pois aqui o valor da value de informationFromCache é null 
        // e a tentativa de parse para JSON, seria o mesmo que 
        // converter um valor null em JSON.
        // então se na chamada não houver dados em cache, 
        // os dados obtidos na requisição REST serão salvos no redis e
        // apresentados ao usuário, na próxima chamada o valor já será
        // diferente de null, aí sim poderá ser parseado para JSON
        // e obtido do banco de dados de cache. 
        res.status(200).json({
            data: {
                inCache: 'no',
                data
            }
        });
        yield (0, redis_1.disconnection)();
        return;
    }
    catch (__) {
        res.status(500)
            .json({
            error: 'i am sorry, there is an error with server'
        });
        yield (0, redis_1.disconnection)();
        return;
    }
}));
