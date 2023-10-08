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
exports.getAllDriver = void 0;
const cryptography_1 = __importDefault(require("../../../modules/security/controllers/cryptography/cryptography"));
const knex_1 = __importDefault(require("../../../repositories/knex/knex"));
const driverProjection_1 = require("../../../modules/checklist/entities/driver/projections/driverProjection");
const paginate_calculate_1 = __importDefault(require("./paginate.calculate"));
const cryptography = new cryptography_1.default();
function getAllDriver(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        page = (0, paginate_calculate_1.default)(page, size);
        const data = yield knex_1.default
            .select(driverProjection_1.driverProjection)
            .from("vex_schema.driver")
            .offset(page)
            .limit(size);
        if (data.length === 0)
            return "no data";
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].first_name = cryptography.decrypt(data[cipherDataPosition].first_name);
            data[cipherDataPosition].last_name = cryptography.decrypt(data[cipherDataPosition].last_name);
            data[cipherDataPosition].email = cryptography.decrypt(data[cipherDataPosition].email);
        }
        return data;
    });
}
exports.getAllDriver = getAllDriver;
