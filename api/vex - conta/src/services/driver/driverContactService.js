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
const driverContact_1 = __importDefault(require("../../entities/driver/driverContact"));
const driverProjection_1 = require("../../repositories/projections/driverProjection");
class DriverContactService extends driverContact_1.default {
    constructor(telephone) {
        super(telephone);
        this.driverContact = new driverContact_1.default(this.telephone);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default.where('driver_contact_id', id)
                .from('vex_schema.driver_contact')
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driverContact).from('vex_schema.driver_contact');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_contact_id', id)
                .update(this.driverContact)
                .from('vex_schema.driver_contact');
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select(driverProjection_1.driverContactProjection)
                .from('vex_schema.driver_contact');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('driver_contact_id', id)
                .select(driverProjection_1.driverContactProjection)
                .from('vex_schema.driver_contact');
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from('vex_schema.driver_contact');
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_contact_id', id)
                .delete()
                .from('vex_schema.driver_contact');
        });
    }
}
exports.default = DriverContactService;
