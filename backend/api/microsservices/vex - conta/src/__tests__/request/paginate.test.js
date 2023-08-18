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
exports.getAll = void 0;
const cryptography_1 = __importDefault(require("../../config/security/cryptography"));
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const informationProjection_1 = require("../../repositories/projections/informationProjection");
const cryptography = new cryptography_1.default();
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default
            .select(informationProjection_1.informationProjection)
            .paginate({ currentPage: page, perPage: size })
            .from("vex_schema.information");
        if (data.data.length === 0)
            return "no data";
        // for (let cipherDataPosition in data.data) {
        //   data[cipherDataPosition].starting_km = cryptography.decrypt(
        //     data[cipherDataPosition].starting_km
        //   );
        //   data[cipherDataPosition].final_km = cryptography.decrypt(
        //     data[cipherDataPosition].final_km
        //   );
        //   data[cipherDataPosition].plate = cryptography.decrypt(
        //     data[cipherDataPosition].plate
        //   );
        //   data[cipherDataPosition].notes = cryptography.decrypt(
        //     data[cipherDataPosition].notes
        //   );
        // }
        return data;
    });
}
exports.getAll = getAll;
