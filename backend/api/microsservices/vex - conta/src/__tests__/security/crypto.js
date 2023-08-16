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
exports.deleteByIdCiphedDriver = exports.deleteAllCiphedDriver = exports.deleteByIdCiphedOrg = exports.deleteAllCiphedOrg = exports.verifyDeciphedEmail = exports.verifyDeciphedCnpj = exports.cipherDriverDataAndUpdate = exports.cipherOrgDataAndUpdate = exports.verifyDeciphedEmailAndGetData = exports.verifyDeciphedCnpjAndGetData = exports.decipherDriverDataByIdAndGet = exports.decipherDriverDataAndGet = exports.decipherOrgDataByIdAndGet = exports.decipherOrgDataAndGet = exports.cipherDriverDataAndSave = exports.cipherOrgDataAndSave = void 0;
const crypto_1 = require("../../security/cryptography/crypto");
const bcrypt_1 = require("../../security/cryptography/bcrypt");
const knex_1 = __importDefault(require("../../repositories/knex/knex"));
const orgService_1 = __importDefault(require("../../services/org/orgService"));
const OrgProjection_1 = require("../../repositories/projections/OrgProjection");
const driverService_1 = __importDefault(require("../../services/driver/driverService"));
const driverProjection_1 = require("../../repositories/projections/driverProjection");
// salvar dados cifrados
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
// obter dados decifrados
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
function decipherOrgDataByIdAndGet(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default
            .where("org_id", id)
            .select(OrgProjection_1.orgProjection)
            .from("vex_schema.org");
        if (data.length === 0)
            return "org not found";
        data[0].fantasy_name = (0, crypto_1.decipher)(data[0].fantasy_name);
        data[0].corporate_name = (0, crypto_1.decipher)(data[0].corporate_name);
        data[0].cnpj = (0, crypto_1.decipher)(data[0].cnpj);
        data[0].org_status = (0, crypto_1.decipher)(data[0].org_status);
        data[0].cnae_main_code = (0, crypto_1.decipher)(data[0].cnae_main_code);
        data[0].open_date = (0, crypto_1.decipher)(data[0].open_date);
        return data;
    });
}
exports.decipherOrgDataByIdAndGet = decipherOrgDataByIdAndGet;
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
function decipherDriverDataByIdAndGet(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default
            .where("driver_id", id)
            .select(driverProjection_1.driverProjection)
            .from("vex_schema.driver");
        if (data.length === 0)
            return "driver not found";
        data[0].first_name = (0, crypto_1.decipher)(data[0].first_name);
        data[0].last_name = (0, crypto_1.decipher)(data[0].last_name);
        data[0].email = (0, crypto_1.decipher)(data[0].email);
        return data;
    });
}
exports.decipherDriverDataByIdAndGet = decipherDriverDataByIdAndGet;
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
//atualizar dados cifrados
function cipherOrgDataAndUpdate(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifyId = new orgService_1.default();
        const orgIdExistsOnDb = yield verifyId.verifyId(id);
        if (orgIdExistsOnDb === false)
            return "organization not found";
        data.fantasy_name = (0, crypto_1.cipher)(data.fantasy_name);
        data.corporate_name = (0, crypto_1.cipher)(data.corporate_name);
        data.cnpj = (0, crypto_1.cipher)(data.cnpj);
        data.org_status = (0, crypto_1.cipher)(data.org_status);
        data.cnae_main_code = (0, crypto_1.cipher)(data.cnae_main_code);
        data.open_date = (0, crypto_1.cipher)(data.open_date);
        data.password = (0, bcrypt_1.cryptograph)(data.password);
        const orgService = new orgService_1.default(data.fantasy_name, data.corporate_name, data.cnpj, data.org_status, data.cnae_main_code, data.open_date, data.password);
        yield orgService.update(id);
        if (orgIdExistsOnDb === true)
            return "organization updated and crypted with success";
    });
}
exports.cipherOrgDataAndUpdate = cipherOrgDataAndUpdate;
function cipherDriverDataAndUpdate(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifyId = new driverService_1.default();
        const orgIdExistsOnDb = yield verifyId.verifyId(id);
        if (orgIdExistsOnDb === false)
            return "driver not found";
        data.first_name = (0, crypto_1.cipher)(data.first_name);
        data.last_name = (0, crypto_1.cipher)(data.last_name);
        data.email = (0, crypto_1.cipher)(data.email);
        data.password = (0, bcrypt_1.cryptograph)(data.password);
        const driverService = new driverService_1.default(data.first_name, data.last_name, data.email, data.password);
        yield driverService.update(id);
        if (orgIdExistsOnDb === true)
            return "driver updated and crypted with success";
    });
}
exports.cipherDriverDataAndUpdate = cipherDriverDataAndUpdate;
//verificação de existência no database
function verifyDeciphedCnpj(cnpj) {
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
            return false;
        return true;
    });
}
exports.verifyDeciphedCnpj = verifyDeciphedCnpj;
function verifyDeciphedEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(driverProjection_1.driverProjection).from("vex_schema.driver");
        for (let cipherDataPosition in data) {
            data[cipherDataPosition].first_name = (0, crypto_1.decipher)(data[cipherDataPosition].first_name);
            data[cipherDataPosition].last_name = (0, crypto_1.decipher)(data[cipherDataPosition].last_name);
            data[cipherDataPosition].email = (0, crypto_1.decipher)(data[cipherDataPosition].email);
        }
        const search = data.find((dataElement) => dataElement.email === email);
        if (!search)
            return false;
        return true;
    });
}
exports.verifyDeciphedEmail = verifyDeciphedEmail;
//deletar dados cifrados
function deleteAllCiphedOrg() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(OrgProjection_1.orgProjection).from("vex_schema.org");
        if (data.length === 0)
            return "no data";
        yield knex_1.default.delete().from("vex_schema.org");
    });
}
exports.deleteAllCiphedOrg = deleteAllCiphedOrg;
function deleteByIdCiphedOrg(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default
            .where("org_id", id)
            .select(OrgProjection_1.orgProjection)
            .from("vex_schema.org");
        if (data.length === 0)
            return "organization not found";
        yield knex_1.default.where("org_id", id).delete().from("vex_schema.org");
    });
}
exports.deleteByIdCiphedOrg = deleteByIdCiphedOrg;
function deleteAllCiphedDriver() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default.select(driverProjection_1.driverProjection).from("vex_schema.driver");
        if (data.length === 0)
            return "no data";
        yield knex_1.default.delete().from("vex_schema.driver");
    });
}
exports.deleteAllCiphedDriver = deleteAllCiphedDriver;
function deleteByIdCiphedDriver(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield knex_1.default
            .where("driver_id", id)
            .select(driverProjection_1.driverProjection)
            .from("vex_schema.driver");
        if (data.length === 0)
            return "driver not found";
        yield knex_1.default.where("driver_id", id).delete().from("vex_schema.driver");
    });
}
exports.deleteByIdCiphedDriver = deleteByIdCiphedDriver;
