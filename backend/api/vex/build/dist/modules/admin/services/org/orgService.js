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
const cryptography_1 = __importDefault(require("../../../security/controllers/cryptography/cryptography"));
const org_1 = __importDefault(require("../../../admin/entities/org/org"));
const knex_1 = __importDefault(require("../../../../repositories/knex/knex"));
const OrgProjection_1 = require("../../entities/org/projections/OrgProjection");
class OrgService extends org_1.default {
    constructor(fantasy_name, corporate_name, cnpj, org_status, cnae_main_code, open_date, password, cnae_main_description, sector, created_at) {
        super(fantasy_name, corporate_name, cnpj, org_status, cnae_main_code, open_date, password, cnae_main_description, sector, created_at);
        this.org = new org_1.default(this.fantasy_name, this.corporate_name, this.cnpj, this.org_status, this.cnae_main_code, this.open_date, this.password, this.cnae_main_description, this.sector, this.created_at);
        this.cryptography = new cryptography_1.default();
    }
    verifyCnpj(cnpj) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select(OrgProjection_1.orgProjection).from("vex_schema.org");
            for (let cipherDataPosition in data) {
                data[cipherDataPosition].cnpj = this.cryptography.decrypt(data[cipherDataPosition].cnpj);
            }
            const search = data.find((dataElement) => dataElement.cnpj === cnpj);
            if (!search)
                return false;
            return true;
        });
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("org_id", id)
                .from("vex_schema.org")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.org).from("vex_schema.org");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where("org_id", id).update(this.org).from("vex_schema.org");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(OrgProjection_1.orgProjection)
                .from("vex_schema.org")
                .paginate({
                currentPage: page,
                perPage: size,
            });
            if (data.data.length === 0)
                return "no data";
            for (let cipherDataPosition in data.data) {
                data.data[cipherDataPosition].fantasy_name = this.cryptography.decrypt(data.data[cipherDataPosition].fantasy_name);
                data.data[cipherDataPosition].corporate_name = this.cryptography.decrypt(data.data[cipherDataPosition].corporate_name);
                data.data[cipherDataPosition].cnpj = this.cryptography.decrypt(data.data[cipherDataPosition].cnpj);
                data.data[cipherDataPosition].org_status = this.cryptography.decrypt(data.data[cipherDataPosition].org_status);
                data.data[cipherDataPosition].cnae_main_code = this.cryptography.decrypt(data.data[cipherDataPosition].cnae_main_code);
                data.data[cipherDataPosition].open_date = this.cryptography.decrypt(data.data[cipherDataPosition].open_date);
                data.data[cipherDataPosition].cnae_main_description =
                    this.cryptography.decrypt(data.data[cipherDataPosition].cnae_main_description);
                data.data[cipherDataPosition].sector = this.cryptography.decrypt(data.data[cipherDataPosition].sector);
                data.data[cipherDataPosition].account_created_at =
                    this.cryptography.decrypt(data.data[cipherDataPosition].account_created_at);
            }
            return data.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("org_id", id)
                .select(OrgProjection_1.orgProjection)
                .from("vex_schema.org");
            if (data.length === 0)
                return "org not found";
            data[0].fantasy_name = this.cryptography.decrypt(data[0].fantasy_name);
            data[0].corporate_name = this.cryptography.decrypt(data[0].corporate_name);
            data[0].cnpj = this.cryptography.decrypt(data[0].cnpj);
            data[0].org_status = this.cryptography.decrypt(data[0].org_status);
            data[0].cnae_main_code = this.cryptography.decrypt(data[0].cnae_main_code);
            data[0].open_date = this.cryptography.decrypt(data[0].open_date);
            data[0].cnae_main_description = this.cryptography.decrypt(data[0].cnae_main_description);
            data[0].sector = this.cryptography.decrypt(data[0].sector);
            data[0].account_created_at = this.cryptography.decrypt(data[0].account_created_at);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where("org_id", id).delete().from("vex_schema.org");
        });
    }
}
exports.default = OrgService;