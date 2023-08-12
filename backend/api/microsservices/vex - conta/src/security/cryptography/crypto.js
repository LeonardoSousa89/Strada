"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decipher = exports.cipher = void 0;
/** atualizar para a versão mais nova de uso do crypto */
const crypto_1 = __importDefault(require("crypto"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const algorithm = process.env.ALGORITHM;
const key = process.env.CRYPTO_SECRET_KEY;
const strategy = process.env.STRATEGY;
function cipher(args) {
    const cryptography = crypto_1.default.createCipher(algorithm, key);
    const crypt = cryptography.update(args, 'utf8', strategy);
    return crypt;
}
exports.cipher = cipher;
function decipher(args) {
    const cryptography = crypto_1.default.createDecipher(algorithm, key);
    const decrypt = cryptography.update(args, strategy, 'utf8');
    return decrypt;
}
exports.decipher = decipher;
