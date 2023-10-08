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
const orgContact_1 = __importDefault(require("../../entities/org/orgContact"));
const knex_1 = __importDefault(require("../../../../repositories/knex/knex"));
const OrgProjection_1 = require("../../entities/org/projections/OrgProjection");
class OrgContactService extends orgContact_1.default {
    constructor(telephone, ddd, email) {
        super(telephone, ddd, email);
        this.orgContact = new orgContact_1.default(this.telephone, this.ddd, this.email);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("org_contact_id", id)
                .from("vex_schema.org_contact")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.orgContact).from("vex_schema.org_contact");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_contact_id", id)
                .update(this.orgContact)
                .from("vex_schema.org_contact");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(OrgProjection_1.orgContactProjection)
                .from("vex_schema.org_contact")
                .paginate({
                currentPage: page,
                perPage: size,
            });
            if (data.data.length === 0)
                return "no data";
            for (let cipherDataPosition in data.data) {
                data.data[cipherDataPosition].telephone = this.cryptography.decrypt(data.data[cipherDataPosition].telephone);
                data.data[cipherDataPosition].ddd = this.cryptography.decrypt(data.data[cipherDataPosition].ddd);
                data.data[cipherDataPosition].email = this.cryptography.decrypt(data.data[cipherDataPosition].email);
            }
            return data.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("org_contact_id", id)
                .select(OrgProjection_1.orgContactProjection)
                .from("vex_schema.org_contact");
            if (data.length === 0)
                return "org contact not found";
            data[0].telephone = this.cryptography.decrypt(data[0].telephone);
            data[0].ddd = this.cryptography.decrypt(data[0].ddd);
            data[0].email = this.cryptography.decrypt(data[0].email);
            return data;
        });
    }
    deleteAll() { }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_contact_id", id)
                .delete()
                .from("vex_schema.org_contact");
        });
    }
}
exports.default = OrgContactService;
