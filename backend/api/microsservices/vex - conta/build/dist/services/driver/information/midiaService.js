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
const informationProjection_1 = require("../../../repositories/projections/informationProjection");
const cryptography_1 = __importDefault(require("../../../config/security/cryptography"));
const paginate_1 = __importDefault(require("../../../repositories/paginate"));
const midia_1 = __importDefault(require("../../../entities/driver/information/midia"));
class MidiaService extends midia_1.default {
    constructor(uri) {
        super(uri);
        this.information = new midia_1.default(this.uri);
        this.cryptography = new cryptography_1.default();
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("midia_uri_id", id)
                .from("vex_schema.midia_uri")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.information).from("vex_schema.midia_uri");
        });
    }
    update(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("midia_uri_id", id)
                .update(this.information)
                .from("vex_schema.midia_uri");
        });
    }
    getAll(page, size) {
        return __awaiter(this, void 0, void 0, function* () {
            page = (0, paginate_1.default)(page, size);
            const data = yield knex_1.default
                .select(informationProjection_1.midiaProjection)
                .from("vex_schema.midia_uri")
                .offset(page)
                .limit(size);
            if (data.length === 0)
                return "no data";
            // for (let cipherDataPosition in data) {
            //   data[cipherDataPosition].uri = this.cryptography.decrypt(
            //     data[cipherDataPosition].uri
            //   );
            // }
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("midia_uri_id", id)
                .select(informationProjection_1.midiaProjection)
                .from("vex_schema.midia_uri");
            if (data.length === 0)
                return "midia not found";
            // data[0].uri = this.cryptography.decrypt(data[0].uri);
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.midia_uri");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("midia_uri_id", id)
                .delete()
                .from("vex_schema.midia_uri");
        });
    }
}
exports.default = MidiaService;
