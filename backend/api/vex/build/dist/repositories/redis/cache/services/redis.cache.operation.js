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
const redis_1 = require("./../redis");
const redis_2 = require("../redis");
class RedisOperations {
    constructor() {
        this.connection = () => __awaiter(this, void 0, void 0, function* () { return yield (0, redis_2.connect)(); });
        this.disconnection = () => __awaiter(this, void 0, void 0, function* () { return yield (0, redis_2.disconnect)(); });
        this.getCache = (key) => __awaiter(this, void 0, void 0, function* () { return yield (0, redis_1.getCacheValue)(key); });
        this.setCache = (key, value, expiration) => __awaiter(this, void 0, void 0, function* () { return yield (0, redis_1.setCacheValue)(key, value, expiration); });
        this.deleteCache = (key) => __awaiter(this, void 0, void 0, function* () { return yield (0, redis_1.deleteCacheValue)(key); });
    }
}
exports.default = RedisOperations;
