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
const knex_1 = __importDefault(require("../../../../../repositories/knex/knex"));
const information_1 = __importDefault(require("../../../entities/driver/information/information"));
const informationProjection_1 = require("../../../entities/driver/projections/informationProjection");
const cryptography_1 = __importDefault(require("../../../../security/controllers/cryptography/cryptography"));
class InformationService extends information_1.default {
    constructor(starting_km, final_km, plate, notes, date_time_registry) {
        super(starting_km, final_km, plate, notes, date_time_registry);
        this.information = new information_1.default(this.starting_km, this.final_km, this.plate, this.notes, this.date_time_registry);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("information_id", id)
                .from("vex_schema.information")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    verifyInformation(starting_km, final_km) {
        if (starting_km === null && final_km === null)
            return false;
        if (starting_km === "" && final_km === "")
            return false;
        if (starting_km === null && final_km === "")
            return false;
        if (starting_km === "" && final_km === null)
            return false;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.information).from("vex_schema.information");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("information_id", id)
                .update(this.information)
                .from("vex_schema.information");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(informationProjection_1.informationProjection)
                .from("vex_schema.information")
                .paginate({
                currentPage: page,
                perPage: size,
            });
            if (data.data.length === 0)
                return "no data";
            for (let cipherDataPosition in data.data) {
                data.data[cipherDataPosition].starting_km = this.cryptography.decrypt(data.data[cipherDataPosition].starting_km);
                data.data[cipherDataPosition].final_km = this.cryptography.decrypt(data.data[cipherDataPosition].final_km);
                data.data[cipherDataPosition].plate = this.cryptography.decrypt(data.data[cipherDataPosition].plate);
                data.data[cipherDataPosition].notes = this.cryptography.decrypt(data.data[cipherDataPosition].notes);
                data.data[cipherDataPosition].date_time_registry = this.cryptography.decrypt(data.data[cipherDataPosition].date_time_registry);
            }
            return data.data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("information_id", id)
                .select(informationProjection_1.informationProjection)
                .from("vex_schema.information");
            if (data.length === 0)
                return "information not found";
            data[0].starting_km = this.cryptography.decrypt(data[0].starting_km);
            data[0].final_km = this.cryptography.decrypt(data[0].final_km);
            data[0].plate = this.cryptography.decrypt(data[0].plate);
            data[0].notes = this.cryptography.decrypt(data[0].notes);
            data[0].date_time_registry = this.cryptography.decrypt(data[0].date_time_registry);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.information");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("information_id", id)
                .delete()
                .from("vex_schema.information");
        });
    }
}
exports.default = InformationService;
