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
exports.getCnpj = void 0;
const cnpjService_1 = __importDefault(require("../../../services/cnpj/cnpjService"));
const getCnpj = (req, res, cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json(yield new cnpjService_1.default(cnpj).GET());
    }
    catch (__) {
        return res
            .status(503)
            .json({ error: "there's an error to access api endpoint" });
    }
});
exports.getCnpj = getCnpj;
