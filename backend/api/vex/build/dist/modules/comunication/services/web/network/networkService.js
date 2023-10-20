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
exports.clientMachineIp = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function ip(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield axios_1.default.get(apiUrl);
            const ipData = data.data;
            return ipData;
        }
        catch (e) {
            return e;
        }
    });
}
function ipGeoLocation(apiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield axios_1.default.get(apiUrl);
            const ipData = data.data;
            return ipData;
        }
        catch (e) {
            return e;
        }
    });
}
function ipDataResponse(geoIpApiUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //somente ipv4
            const ipGeoData = yield ipGeoLocation(geoIpApiUrl);
            const public_ip_client_data = ipGeoData.ip;
            return { public_ip_client_data, ip_client_data_provider: ipGeoData };
        }
        catch (e) {
            return e;
        }
    });
}
function clientMachineIp() {
    return __awaiter(this, void 0, void 0, function* () {
        const ipApiUrl = `${process.env.USER_IP_API_URL_BASE}`;
        const userIp = yield ip(ipApiUrl);
        const geoIpApiUrl = `${process.env.GEO_IP_API_URL_BASE}/${userIp}/json`;
        const ipData = yield ipDataResponse(geoIpApiUrl);
        const dataMachine = ipData.ip_client_data_provider;
        return dataMachine;
    });
}
exports.clientMachineIp = clientMachineIp;
