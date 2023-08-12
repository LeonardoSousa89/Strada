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
const org_1 = __importDefault(require("../../entities/org/org"));
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const OrgProjection_1 = require("../../repositories/projections/OrgProjection");
class OrgService extends org_1.default {
    constructor(fantasy_name, corporate_name, cnpj, org_status, cnae_main_code, open_date, password) {
        super(fantasy_name, corporate_name, cnpj, org_status, cnae_main_code, open_date, password);
        this.org = new org_1.default(this.fantasy_name, this.corporate_name, this.cnpj, this.org_status, this.cnae_main_code, this.open_date, this.password);
    }
    verifyCnpj(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsCnpj = yield knex_1.default.where('cnpj', cnpj)
                .from('vex_schema.org')
                .first();
            if (existsOrNotExistsCnpj)
                return true;
            if (!existsOrNotExistsCnpj)
                return false;
        });
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default.where('org_id', id)
                .from('vex_schema.org')
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.org).from('vex_schema.org');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('org_id', id)
                .update(this.org)
                .from('vex_schema.org');
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select(OrgProjection_1.orgProjection)
                .from('vex_schema.org');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('org_id', id)
                .select(OrgProjection_1.orgProjection)
                .from('vex_schema.org');
            return data;
        });
    }
    deleteAll() { }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('org_id', id).delete().from('vex_schema.org');
        });
    }
}
exports.default = OrgService;
