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
const handleError_1 = __importDefault(require("../../interface/error/handleError"));
const OrgJoinQueryController = express_1.default.Router();
exports.OrgJoinQueryController = OrgJoinQueryController;
const err = new handleError_1.default();
/**
 * erro do knex-paginate usado em mais de um arquivo:
 *
 * Error: Can't extend QueryBuilder with existing method ('paginate')
 */
OrgJoinQueryController.route('/org/join/data').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Org = Object.assign({}, req.query);
    if (!Org.org_id)
        return res.status(400)
            .json({
            error: 'query params required'
        });
    const response = new orgJoinQueryService_1.default().getById(Number(Org.org_id));
    yield response.then(data => {
        if (data.data.organization.length === 0)
            return res.status(404)
                .json({
                error: 'organization not found'
            });
        return res.status(200).json(data);
    })
        .catch(__ => res.status(500)
        .json({
        error: 'i am sorry, there is an error with server'
    }));
}));
