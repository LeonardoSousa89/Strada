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
const orgIpDataProvider_1 = __importDefault(require("../../entities/org/orgIpDataProvider"));
const knex_1 = __importDefault(require("../../../../repositories/knex/knex"));
const OrgProjection_1 = require("../../entities/org/projections/OrgProjection");
class OrgIpDataProviderService extends orgIpDataProvider_1.default {
    constructor(ip, hostname, city, region, country, loc, org, postal, timezone, readme) {
        super(ip, hostname, city, region, country, loc, org, postal, timezone, readme);
        this.orgIpDataProvider = new orgIpDataProvider_1.default(this.ip, this.hostname, this.city, this.region, this.country, this.loc, this.org, this.postal, this.timezone, this.readme);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("org_ip_data_provider_id", id)
                .from("vex_schema.org_ip_data_provider")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .insert(this.orgIpDataProvider)
                .from("vex_schema.org_ip_data_provider");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_ip_data_provider_id", id)
                .update(this.orgIpDataProvider)
                .from("vex_schema.org_ip_data_provider");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(OrgProjection_1.orgIpDataProviderProjection)
                .from("vex_schema.org_ip_data_provider")
                .paginate({
                currentPage: page,
                perPage: size,
            });
            if (data.data.length === 0)
                return "no data";
            for (let cipherDataPosition in data.data) {
                data.data[cipherDataPosition].public_client_ip =
                    this.cryptography.decrypt(data.data[cipherDataPosition].public_client_ip);
                data.data[cipherDataPosition].hostname = this.cryptography.decrypt(data.data[cipherDataPosition].hostname);
                data.data[cipherDataPosition].city = this.cryptography.decrypt(data.data[cipherDataPosition].city);
                data.data[cipherDataPosition].region = this.cryptography.decrypt(data.data[cipherDataPosition].region);
                data.data[cipherDataPosition].country = this.cryptography.decrypt(data.data[cipherDataPosition].country);
                data.data[cipherDataPosition].loc = this.cryptography.decrypt(data.data[cipherDataPosition].loc);
                data.data[cipherDataPosition].provider = this.cryptography.decrypt(data.data[cipherDataPosition].provider);
                data.data[cipherDataPosition].postal = this.cryptography.decrypt(data.data[cipherDataPosition].postal);
                data.data[cipherDataPosition].timezone = this.cryptography.decrypt(data.data[cipherDataPosition].timezone);
                data.data[cipherDataPosition].readme = this.cryptography.decrypt(data.data[cipherDataPosition].readme);
            }
            return data.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("org_ip_data_provider_id", id)
                .select(OrgProjection_1.orgIpDataProviderProjection)
                .from("vex_schema.org_ip_data_provider");
            if (data.length === 0)
                return "organization data machine not found";
            data[0].public_client_ip = this.cryptography.decrypt(data[0].public_client_ip);
            data[0].hostname = this.cryptography.decrypt(data[0].hostname);
            data[0].city = this.cryptography.decrypt(data[0].city);
            data[0].region = this.cryptography.decrypt(data[0].region);
            data[0].country = this.cryptography.decrypt(data[0].country);
            data[0].loc = this.cryptography.decrypt(data[0].loc);
            data[0].provider = this.cryptography.decrypt(data[0].provider);
            data[0].postal = this.cryptography.decrypt(data[0].postal);
            data[0].timezone = this.cryptography.decrypt(data[0].timezone);
            data[0].readme = this.cryptography.decrypt(data[0].readme);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("org_ip_data_provider_id", id)
                .delete()
                .from("vex_schema.org_ip_data_provider");
        });
    }
}
exports.default = OrgIpDataProviderService;
