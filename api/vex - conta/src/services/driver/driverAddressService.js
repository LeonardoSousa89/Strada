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
class DriverAddressService extends driverAddress_1.default {
    constructor(zip_code, state, city) {
        super(zip_code, state, city);
        this.driverAddressService = new driverAddress_1.default(this.zip_code, this.state, this.city);
    }
    getZipCode(axios, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield axios.get(url);
            return data.data;
        });
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExists = yield knex_1.default.where('driver_address_id', id)
                .from('vex_schema.driver_address')
                .first();
            if (existsOrNotExists)
                return true;
            if (!existsOrNotExists)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driverAddressService).from('vex_schema.driver_address');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_address_id', id)
                .update(this.driverAddressService)
                .from('vex_schema.driver_address');
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select('*')
                .from('vex_schema.driver_address');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('driver_address_id', id)
                .select('*')
                .from('vex_schema.driver_address');
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from('vex_schema.driver_address');
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_address_id', id)
                .delete()
                .from('vex_schema.driver_address');
        });
    }
}
exports.default = DriverAddressService;
