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
exports.decipherDataAndGet = exports.cipherDataAndSave = void 0;
const crypto_1 = require("../../security/cryptography/crypto");
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const bcrypt_1 = require("../../security/cryptography/bcrypt");
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
function cipherDataAndSave(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.fantasy_name = (0, crypto_1.cipher)(data.fantasy_name);
        data.corporate_name = (0, crypto_1.cipher)(data.corporate_name);
        data.cnpj = (0, crypto_1.cipher)(data.cnpj);
        data.org_status = (0, crypto_1.cipher)(data.org_status);
        data.cnae_main_code = (0, crypto_1.cipher)(data.cnae_main_code);
        data.open_date = (0, crypto_1.cipher)(data.open_date);
        data.password = (0, bcrypt_1.cryptograph)(data.password);
        const orgService = new orgService_1.default(data.fantasy_name, data.corporate_name, data.cnpj, data.org_status, data.cnae_main_code, data.open_date, data.password);
        yield orgService.save();
    });
}
exports.cipherDataAndSave = cipherDataAndSave;
function decipherDataAndGet() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield knex_1.default.select('*').from('vex_schema.org');
    });
}
exports.decipherDataAndGet = decipherDataAndGet;
