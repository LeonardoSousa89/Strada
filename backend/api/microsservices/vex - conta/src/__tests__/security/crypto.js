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
exports.verifyDeciphedDocumentAndGetData = exports.verifyDeciphedEmailAndGetData = exports.verifyDeciphedCnpjAndGetData = exports.decipherDriverDataAndGet = exports.decipherOrgDataAndGet = exports.cipherDriverDataAndSave = exports.cipherOrgDataAndSave = void 0;
const crypto_1 = require("../../security/cryptography/crypto");
const bcrypt_1 = require("../../security/cryptography/bcrypt");
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const OrgProjection_1 = require("../../repositories/projections/OrgProjection");
const driverService_1 = __importDefault(require("../../services/driver/driverService"));
const driverProjection_1 = require("../../repositories/projections/driverProjection");
function cipherOrgDataAndSave(data) {
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
exports.cipherOrgDataAndSave = cipherOrgDataAndSave;
function cipherDriverDataAndSave(data) {
    return __awaiter(this, void 0, void 0, function* () {
        data.first_name = (0, crypto_1.cipher)(data.first_name);
        data.last_name = (0, crypto_1.cipher)(data.last_name);
        data.email = (0, crypto_1.cipher)(data.email);
        data.password = (0, bcrypt_1.cryptograph)(data.password);
        const driverService = new driverService_1.default(data.first_name, data.last_name, data.email, data.password);
        yield driverService.save();
    });
}
exports.cipherDriverDataAndSave = cipherDriverDataAndSave;
function decipherOrgDataAndGet() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(OrgProjection_1.orgProjection).from("vex_schema.org");
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].fantasy_name = (0, crypto_1.decipher)(data[cipherDataPosition].fantasy_name);
            data[cipherDataPosition].corporate_name = (0, crypto_1.decipher)(data[cipherDataPosition].corporate_name);
            data[cipherDataPosition].cnpj = (0, crypto_1.decipher)(data[cipherDataPosition].cnpj);
            data[cipherDataPosition].org_status = (0, crypto_1.decipher)(data[cipherDataPosition].org_status);
            data[cipherDataPosition].cnae_main_code = (0, crypto_1.decipher)(data[cipherDataPosition].cnae_main_code);
            data[cipherDataPosition].open_date = (0, crypto_1.decipher)(data[cipherDataPosition].open_date);
        }
        return data;
    });
}
exports.decipherOrgDataAndGet = decipherOrgDataAndGet;
function decipherDriverDataAndGet() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(driverProjection_1.driverProjection).from("vex_schema.driver");
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].first_name = (0, crypto_1.decipher)(data[cipherDataPosition].first_name);
            data[cipherDataPosition].last_name = (0, crypto_1.decipher)(data[cipherDataPosition].last_name);
            data[cipherDataPosition].email = (0, crypto_1.decipher)(data[cipherDataPosition].email);
        }
        return data;
    });
}
exports.decipherDriverDataAndGet = decipherDriverDataAndGet;
function verifyDeciphedCnpjAndGetData(cnpj) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(OrgProjection_1.orgProjection).from("vex_schema.org");
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].fantasy_name = (0, crypto_1.decipher)(data[cipherDataPosition].fantasy_name);
            data[cipherDataPosition].corporate_name = (0, crypto_1.decipher)(data[cipherDataPosition].corporate_name);
            data[cipherDataPosition].cnpj = (0, crypto_1.decipher)(data[cipherDataPosition].cnpj);
            data[cipherDataPosition].org_status = (0, crypto_1.decipher)(data[cipherDataPosition].org_status);
            data[cipherDataPosition].cnae_main_code = (0, crypto_1.decipher)(data[cipherDataPosition].cnae_main_code);
            data[cipherDataPosition].open_date = (0, crypto_1.decipher)(data[cipherDataPosition].open_date);
        }
        const search = data.find((dataElement) => dataElement.cnpj === cnpj);
        if (!search)
            return "cnpj not found";
        return search;
    });
}
exports.verifyDeciphedCnpjAndGetData = verifyDeciphedCnpjAndGetData;
function verifyDeciphedEmailAndGetData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(driverProjection_1.driverProjection).from("vex_schema.driver");
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].first_name = (0, crypto_1.decipher)(data[cipherDataPosition].first_name);
            data[cipherDataPosition].last_name = (0, crypto_1.decipher)(data[cipherDataPosition].last_name);
            data[cipherDataPosition].email = (0, crypto_1.decipher)(data[cipherDataPosition].email);
        }
        const search = data.find((dataElement) => dataElement.email === email);
        if (!search)
            return "email not found";
        return search;
    });
}
exports.verifyDeciphedEmailAndGetData = verifyDeciphedEmailAndGetData;
function verifyDeciphedDocumentAndGetData(cnh) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.verifyDeciphedDocumentAndGetData = verifyDeciphedDocumentAndGetData;
