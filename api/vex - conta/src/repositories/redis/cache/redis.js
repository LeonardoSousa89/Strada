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
exports.getCacheValue = exports.setCacheValue = exports.disconnect = exports.connect = void 0;
const redis_1 = require("../../../database/cache/redis");
const connect = () => __awaiter(void 0, void 0, void 0, function* () { return yield redis_1.client.connect(); });
exports.connect = connect;
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () { return yield redis_1.client.disconnect(); });
exports.disconnect = disconnect;
const setCacheValue = (key, value, expiration) => __awaiter(void 0, void 0, void 0, function* () { return yield redis_1.client.set(key, value, { EX: expiration }); });
exports.setCacheValue = setCacheValue;
const getCacheValue = (key) => __awaiter(void 0, void 0, void 0, function* () { return yield redis_1.client.get(key); });
exports.getCacheValue = getCacheValue;
