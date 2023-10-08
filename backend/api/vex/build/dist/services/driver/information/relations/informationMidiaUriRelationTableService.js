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
const informationMidiaUriRelationTable_1 = __importDefault(require("../../../../entities/driver/information/relations/informationMidiaUriRelationTable"));
const knex_1 = __importDefault(require("../../../../repositories/knex/knex"));
const joinProjection_1 = require("../../../../repositories/projections/joinProjection");
class InformationMidiaUriRelationTableService extends informationMidiaUriRelationTable_1.default {
    constructor(midia_uri_relation_id, information_relation_id, driver_relation_id, org_relation_id) {
        super(midia_uri_relation_id, information_relation_id, driver_relation_id, org_relation_id);
        this.informationMidiaUriRelationTable = new informationMidiaUriRelationTable_1.default(this.midia_uri_relation_id, this.information_relation_id, this.driver_relation_id, this.org_relation_id);
    }
    verifyId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("midia_uri_relation_table_id", id)
                .from("vex_schema.information_midia_uri_relation_table")
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    verifyRelationshipExists(midia_uri_relation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default
                .where("midia_uri_relation_id", midia_uri_relation_id)
                .from("vex_schema.information_midia_uri_relation_table")
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
                .insert(this.informationMidiaUriRelationTable)
                .from("vex_schema.information_midia_uri_relation_table");
        });
    }
    update(id) { }
    getAll(size, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .select(joinProjection_1.joinInformationAndMidiaUriRelationProjection)
                .from("vex_schema.information_midia_uri_relation_table");
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default
                .where("midia_uri_relation_table_id", id)
                .select(joinProjection_1.joinInformationAndMidiaUriRelationProjection)
                .from("vex_schema.information_midia_uri_relation_table");
            return data;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.delete().from("vex_schema.information_midia_uri_relation_table");
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default
                .where("midia_uri_relation_table_id", id)
                .delete()
                .from("vex_schema.information_midia_uri_relation_table");
        });
    }
}
exports.default = InformationMidiaUriRelationTableService;
