"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("../security/crypto");
test('expect cypher data args', function () {
    const data = {
        fantasy_name: 'MINE MERCADO BAHIA',
        corporate_name: 'MINE MERCADO SALVADOR NORTE LTDA',
        cnpj: '18136807000111',
        org_status: 'ATIVA',
        cnae_main_code: '4712100',
        open_date: '17/05/2013',
        password: 'FAmiLIAaNDRAdE'
    };
    expect((0, crypto_1.cipherOrgDataAndSave)(data)).not.toBeNull();
});
test('expect decipher data args', function () {
    expect((0, crypto_1.decipherOrgDataAndGet)()).not.toBeNull();
    expect((0, crypto_1.decipherOrgDataAndGet)()).not.toBeUndefined();
});
test('expect cypher data args', function () {
    const data = {
        first_name: "Alberto",
        last_name: "Botelho",
        email: "botelho@outlook.com",
        password: "logistica2023"
    };
    expect((0, crypto_1.cipherDriverDataAndSave)(data)).not.toBeNull();
});
test('expect decipher data args', function () {
    expect((0, crypto_1.decipherOrgDataAndGet)()).not.toBeNull();
    expect((0, crypto_1.decipherOrgDataAndGet)()).not.toBeUndefined();
});
