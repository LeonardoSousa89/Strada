"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("../../services/cryptography/bcrypt");
const crypto_1 = require("../../services/cryptography/crypto");
class Cryptography {
    constructor() {
        this.encrypt = (args) => (0, crypto_1.cipher)(args);
        this.decrypt = (args) => (0, crypto_1.decipher)(args);
        this.hash = (password) => (0, bcrypt_1.cryptograph)(password);
    }
}
exports.default = Cryptography;
