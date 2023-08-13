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
const driver_1 = __importDefault(require("../../entities/driver/driver"));
const driverProjection_1 = require("../../repositories/projections/driverProjection");
class DriverService extends driver_1.default {
    constructor(first_name, last_name, email, password) {
        super(first_name, last_name, email, password);
        this.driver = new driver_1.default(this.first_name, this.last_name, this.email, this.password);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("driver_id", id)
                .from("vex_schema.driver")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    verifyEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsEmail = yield knex_1.default
                .where("email", email)
                .from("vex_schema.driver")
                .first();
            if (existsOrNotExistsEmail)
                return true;
            if (!existsOrNotExistsEmail)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driver).from("vex_schema.driver");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_id", id)
                .update(this.driver)
                .from("vex_schema.driver");
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select(driverProjection_1.driverProjection).from("vex_schema.driver");
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("driver_id", id)
                .select(driverProjection_1.driverProjection)
                .from("vex_schema.driver");
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.driver");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where("driver_id", id).delete().from("vex_schema.driver");
        });
    }
}
exports.default = DriverService;
