"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Org {
    constructor(fantasy_name, corporate_name, cnpj, org_status, cnae_main_code, open_date, password, cnae_main_description, sector, created_at) {
        this.fantasy_name = fantasy_name;
        this.corporate_name = corporate_name;
        this.cnpj = cnpj;
        this.org_status = org_status;
        this.cnae_main_code = cnae_main_code;
        this.open_date = open_date;
        this.password = password;
        this.cnae_main_description = cnae_main_description;
        this.sector = sector;
        this.created_at = created_at;
    }
}
exports.default = Org;
