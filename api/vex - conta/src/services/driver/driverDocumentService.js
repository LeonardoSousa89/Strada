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
const driverDocument_1 = __importDefault(require("../../entities/driver/driverDocument"));
class DriverDocumentService extends driverDocument_1.default {
    constructor(cnh) {
        super(cnh);
        this.driverDocument = new driverDocument_1.default(this.cnh);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExists = yield knex_1.default.where('driver_document_id', id)
                .from('vex_schema.driver_document')
                .first();
            if (existsOrNotExists)
                return true;
            if (!existsOrNotExists)
                return false;
        });
    }
    verifyDocument(cnh) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExists = yield knex_1.default.where('cnh', cnh)
                .from('vex_schema.driver_document')
                .first();
            if (existsOrNotExists)
                return true;
            if (!existsOrNotExists)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driverDocument).from('vex_schema.driver_document');
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_document_id', id)
                .update(this.driverDocument)
                .from('vex_schema.driver_document');
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select('*')
                .from('vex_schema.driver_document');
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.where('driver_document_id', id)
                .select('*')
                .from('vex_schema.driver_document');
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from('vex_schema.driver_document');
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.where('driver_document_id', id)
                .delete()
                .from('vex_schema.driver_document');
        });
    }
}
exports.default = DriverDocumentService;
