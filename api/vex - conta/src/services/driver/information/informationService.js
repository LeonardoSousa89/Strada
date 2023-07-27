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
const knex_1 = __importDefault(require("../../../repositories/knex/knex"));
const information_1 = __importDefault(require("../../../entities/driver/information/information"));
class InformationService extends information_1.default {
    constructor(starting_km, final_km, plate, notes) {
        super(starting_km, final_km, plate, notes);
        this.information = new information_1.default(this.starting_km, this.final_km, this.plate, this.notes);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExists = yield knex_1.default.where('information_id', id)
                .from('vex_schema.information')
                .first();
            if (existsOrNotExists)
                return true;
            if (!existsOrNotExists)
                return false;
        });
    }
    verifyInformation(starting_km, final_km) {
        if (starting_km === null &&
            final_km === null)
            return false;
        if (starting_km === '' &&
            final_km === '')
            return false;
        if (starting_km === null &&
            final_km === '')
            return false;
        if (starting_km === '' &&
            final_km === null)
            return false;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.information).from('vex_schema.information');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('information_id', id)
                .update(this.information)
                .from('vex_schema.information');
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select('*')
                .from('vex_schema.information');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('information_id', id)
                .select('*')
                .from('vex_schema.information');
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from('vex_schema.information');
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('information_id', id)
                .delete()
                .from('vex_schema.information');
        });
    }
}
exports.default = InformationService;
