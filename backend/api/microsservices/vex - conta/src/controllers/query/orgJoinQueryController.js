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
exports.OrgJoinQueryController = void 0;
const express_1 = __importDefault(require("express"));
const orgJoinQueryService_1 = __importDefault(require("../../services/query/orgJoinQueryService"));
const redis_cache_operation_1 = __importDefault(require("../../repositories/redis/cache/services/redis.cache.operation"));
const OrgJoinQueryController = express_1.default.Router();
exports.OrgJoinQueryController = OrgJoinQueryController;
OrgJoinQueryController.route("/org/join/data").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    const orgJoinQueryService = new orgJoinQueryService_1.default();
    const cache = new redis_cache_operation_1.default();
    if (!Org.org_id)
        return res.status(400).json({
            error: "query params required",
        });
    try {
        const orgJoinQueryFromCache = yield cache.getCache(`OrgJoinQuery_${Org.org_id}`);
        if (orgJoinQueryFromCache) {
            const data = JSON.parse(orgJoinQueryFromCache);
            return res.status(200).json({
                data: { inCache: "yes", data },
            });
        }
        const data = yield orgJoinQueryService.getById(Number(Org.org_id));
        if (data.data.organization.length === 0) {
            return res.status(404).json({
                error: "organization not found",
            });
        }
        yield cache.setCache(`OrgJoinQuery_${Org.org_id}`, JSON.stringify(data), 300);
        return res.status(200).json({
            data: { inCache: "no", data },
        });
    }
    catch (__) {
        return res.status(500).json({
            error: "i am sorry, there is an error with server",
        });
    }
}));
