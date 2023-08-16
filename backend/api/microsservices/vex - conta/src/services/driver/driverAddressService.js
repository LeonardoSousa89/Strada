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
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const driverAddress_1 = __importDefault(require("../../entities/driver/driverAddress"));
const driverProjection_1 = require("../../repositories/projections/driverProjection");
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
class DriverAddressService extends driverAddress_1.default {
    constructor(zip_code, state, city) {
        super(zip_code, state, city);
        this.driverAddressService = new driverAddress_1.default(this.zip_code, this.state, this.city);
        this.cryptography = new cryptography_1.default();
    }
    getZipCode(axios, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios.get(url);
            return data.data;
        });
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("driver_address_id", id)
                .from("vex_schema.driver_address")
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
                .insert(this.driverAddressService)
                .from("vex_schema.driver_address");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_address_id", id)
                .update(this.driverAddressService)
                .from("vex_schema.driver_address");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(driverProjection_1.driverAddressProjection)
                .from("vex_schema.driver_address");
            if (data.length === 0)
                return "no data";
            for (let cipherDataPosition in data) {
                data[cipherDataPosition].zip_code = this.cryptography.decrypt(data[cipherDataPosition].zip_code);
                data[cipherDataPosition].state = this.cryptography.decrypt(data[cipherDataPosition].state);
                data[cipherDataPosition].city = this.cryptography.decrypt(data[cipherDataPosition].city);
            }
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("driver_address_id", id)
                .select(driverProjection_1.driverAddressProjection)
                .from("vex_schema.driver_address");
            if (data.length === 0)
                return "driver address not found";
            data[0].zip_code = this.cryptography.decrypt(data[0].zip_code);
            data[0].state = this.cryptography.decrypt(data[0].state);
            data[0].city = this.cryptography.decrypt(data[0].city);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.driver_address");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_address_id", id)
                .delete()
                .from("vex_schema.driver_address");
        });
    }
}
exports.default = DriverAddressService;
