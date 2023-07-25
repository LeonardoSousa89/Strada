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
const orgAddressRelationTable_1 = __importDefault(require("../../../entities/org/relations/orgAddressRelationTable"));
const knex_1 = __importDefault(require("../../../repositories/knex/knex"));
class OrgAddressRelationTableService extends orgAddressRelationTable_1.default {
    constructor(org_address_id, org_id) {
        super(org_address_id, org_id);
        this.organizationAddressRelationTable = new orgAddressRelationTable_1.default(this.org_address_id, this.org_id);
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default.insert(this.organizationAddressRelationTable).from('vex_schema.org_address_relation_table');
        });
    }
    update(id) {
    }
    getAll(size, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield knex_1.default.select('*').from('vex_schema.org_address_relation_table');
            return data;
        });
    }
    getById(id) { }
    deleteAll() { }
    deleteById(id) { }
}
exports.default = OrgAddressRelationTableService;
