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
const driverProjection_1 = require("../../repositories/projections/driverProjection");
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
const paginate_1 = __importDefault(require("../../repositories/paginate"));
class DriverDocumentService extends driverDocument_1.default {
    constructor(cnh) {
        super(cnh);
        this.driverDocument = new driverDocument_1.default(this.cnh);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("driver_document_id", id)
                .from("vex_schema.driver_document")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    verifyDocument(cnh) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(driverProjection_1.driverDocumentProjection)
                .from("vex_schema.driver_document");
            for (let cipherDataPosition in data) {
                data[cipherDataPosition].cnh = this.cryptography.decrypt(data[cipherDataPosition].cnh);
            }
            const search = data.find((dataElement) => dataElement.cnh === cnh);
            if (!search)
                return false;
            return true;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.driverDocument).from("vex_schema.driver_document");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_document_id", id)
                .update(this.driverDocument)
                .from("vex_schema.driver_document");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            page = (0, paginate_1.default)(page, size);
            const data = yield knex_1.default
                .select(driverProjection_1.driverDocumentProjection)
                .from("vex_schema.driver_document")
                .offset(page)
                .limit(size);
            if (data.length === 0)
                return "no data";
            for (let cipherDataPosition in data) {
                data[cipherDataPosition].cnh = this.cryptography.decrypt(data[cipherDataPosition].cnh);
            }
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("driver_document_id", id)
                .select(driverProjection_1.driverDocumentProjection)
                .from("vex_schema.driver_document");
            if (data.length === 0)
                return "driver document not found";
            data[0].cnh = this.cryptography.decrypt(data[0].cnh);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.driver_document");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("driver_document_id", id)
                .delete()
                .from("vex_schema.driver_document");
        });
    }
}
exports.default = DriverDocumentService;
