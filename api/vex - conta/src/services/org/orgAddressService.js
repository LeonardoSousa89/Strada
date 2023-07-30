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
const orgAddress_1 = __importDefault(require("../../entities/org/orgAddress"));
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
class OrgAddressService extends orgAddress_1.default {
    constructor(zip_code, street_type, public_place, org_number, complement, neighborhood, county, country) {
        super(zip_code, street_type, public_place, org_number, complement, neighborhood, county, country);
        this.orgAddress = new orgAddress_1.default(this.zip_code, this.street_type, this.public_place, this.org_number, this.complement, this.neighborhood, this.county, this.country);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default.where('org_address_id', id)
                .from('vex_schema.org_address')
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.orgAddress).from('vex_schema.org_address');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('org_address_id', id)
                .update(this.orgAddress)
                .from('vex_schema.org_address');
        });
    }
    getAll(size, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select('*').from('vex_schema.org_address');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('org_address_id', id)
                .select('*')
                .from('vex_schema.org_address');
            return data;
        });
    }
    deleteAll() { }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('org_address_id', id)
                .delete()
                .from('vex_schema.org_address');
        });
    }
}
exports.default = OrgAddressService;
