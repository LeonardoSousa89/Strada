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
exports.ipDataResponse = exports.ipGeoLocation = exports.ip = void 0;
const axios_1 = __importDefault(require("axios"));
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
exports.ip = ip;
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
exports.ipGeoLocation = ipGeoLocation;
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
exports.ipDataResponse = ipDataResponse;
