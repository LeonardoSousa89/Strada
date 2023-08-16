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
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
const orgAddress_1 = __importDefault(require("../../entities/org/orgAddress"));
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const OrgProjection_1 = require("../../repositories/projections/OrgProjection");
class OrgAddressService extends orgAddress_1.default {
    constructor(zip_code, street_type, public_place, org_number, complement, neighborhood, county, country) {
        super(zip_code, street_type, public_place, org_number, complement, neighborhood, county, country);
        this.orgAddress = new orgAddress_1.default(this.zip_code, this.street_type, this.public_place, this.org_number, this.complement, this.neighborhood, this.county, this.country);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("org_address_id", id)
                .from("vex_schema.org_address")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.orgAddress).from("vex_schema.org_address");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_address_id", id)
                .update(this.orgAddress)
                .from("vex_schema.org_address");
        });
    }
    getAll(size, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(OrgProjection_1.orgAddressProjection)
                .from("vex_schema.org_address");
            if (data.length === 0)
                return "no data";
            for (let cipherDataPosition in data) {
                data[cipherDataPosition].zip_code = this.cryptography.decrypt(data[cipherDataPosition].zip_code);
                data[cipherDataPosition].street_type = this.cryptography.decrypt(data[cipherDataPosition].street_type);
                data[cipherDataPosition].public_place = this.cryptography.decrypt(data[cipherDataPosition].public_place);
                data[cipherDataPosition].org_number = this.cryptography.decrypt(data[cipherDataPosition].org_number);
                data[cipherDataPosition].complement = this.cryptography.decrypt(data[cipherDataPosition].complement);
                data[cipherDataPosition].neighborhood = this.cryptography.decrypt(data[cipherDataPosition].neighborhood);
                data[cipherDataPosition].county = this.cryptography.decrypt(data[cipherDataPosition].county);
                data[cipherDataPosition].country = this.cryptography.decrypt(data[cipherDataPosition].country);
            }
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("org_address_id", id)
                .select(OrgProjection_1.orgAddressProjection)
                .from("vex_schema.org_address");
            if (data.length === 0)
                return "organization address not found";
            data[0].zip_code = this.cryptography.decrypt(data[0].zip_code);
            data[0].street_type = this.cryptography.decrypt(data[0].street_type);
            data[0].public_place = this.cryptography.decrypt(data[0].public_place);
            data[0].org_number = this.cryptography.decrypt(data[0].org_number);
            data[0].complement = this.cryptography.decrypt(data[0].complement);
            data[0].neighborhood = this.cryptography.decrypt(data[0].neighborhood);
            data[0].county = this.cryptography.decrypt(data[0].county);
            data[0].country = this.cryptography.decrypt(data[0].country);
            return data;
        });
    }
    deleteAll() { }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_address_id", id)
                .delete()
                .from("vex_schema.org_address");
        });
    }
}
exports.default = OrgAddressService;
