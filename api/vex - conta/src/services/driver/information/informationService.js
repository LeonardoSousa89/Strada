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
const informationProjection_1 = require("../../../repositories/projections/informationProjection");
class InformationService extends information_1.default {
    constructor(starting_km, final_km, plate, notes, date_time_registry) {
        super(starting_km, final_km, plate, notes, date_time_registry);
        this.information = new information_1.default(this.starting_km, this.final_km, this.plate, this.notes, this.date_time_registry);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default.where('information_id', id)
                .from('vex_schema.information')
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
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
    getTime() {
        const southAmericaTimeZone = new Date();
        const date = new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            dateStyle: 'long'
        }).format(southAmericaTimeZone);
        const time = new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'America/Sao_Paulo',
            timeStyle: 'short'
        }).format(southAmericaTimeZone);
        return `${date}, ${time}`;
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
            const data = yield knex_1.default.select(informationProjection_1.informationProjection)
                .from('vex_schema.information');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('information_id', id)
                .select(informationProjection_1.informationProjection)
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
    //será preciso deletar toda a associação do motorista, 
    // para conseguir deletar sua informação
    periodicDelete() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = InformationService;
