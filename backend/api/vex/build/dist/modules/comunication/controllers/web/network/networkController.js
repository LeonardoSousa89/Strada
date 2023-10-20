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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientMachineIp = void 0;
const networkService_1 = require("../../../services/web/network/networkService");
const getClientMachineIp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientMachine = yield (0, networkService_1.clientMachineIp)();
        return res.status(200).json(clientMachine);
    }
    catch (__) {
        return res
            .status(500)
            .json({ error: "there's an error to access api endpoint" });
    }
});
exports.getClientMachineIp = getClientMachineIp;
