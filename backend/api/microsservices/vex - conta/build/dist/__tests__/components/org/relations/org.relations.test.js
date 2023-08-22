"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orgIpDataProvider_1 = __importDefault(require("../../../../entities/org/orgIpDataProvider"));
describe("", function () {
    test("expect org data machine args is right", function () {
        const OrgIp = new orgIpDataProvider_1.default("170.84.38.236", "170-84-38-236.nextelecom.net.br", "Lauro de Freitas", "Bahia", "BR", "-12.8944,-38.3272", "AS265019 NEX TELECOM LTDA ME", "42700-000", "America/Bahia", "https://ipinfo.io/missingauth");
        expect(OrgIp.ip).not.toBe("");
        expect(OrgIp.ip).toBe("170.84.38.236");
        expect(OrgIp.hostname).not.toBe("");
        expect(OrgIp.hostname).toBe("170-84-38-236.nextelecom.net.br");
        expect(OrgIp.city).not.toBe("");
        expect(OrgIp.city).toBe("Lauro de Freitas");
        expect(OrgIp.region).not.toBe("");
        expect(OrgIp.region).toBe("Bahia");
        expect(OrgIp.country).not.toBe("");
        expect(OrgIp.country).toBe("BR");
        expect(OrgIp.loc).not.toBe("");
        expect(OrgIp.loc).toBe("-12.8944,-38.3272");
        expect(OrgIp.org).not.toBe("");
        expect(OrgIp.org).toBe("AS265019 NEX TELECOM LTDA ME");
        expect(OrgIp.postal).not.toBe("");
        expect(OrgIp.postal).toBe("42700-000");
        expect(OrgIp.timezone).not.toBe("");
        expect(OrgIp.timezone).toBe("America/Bahia");
        expect(OrgIp.readme).not.toBe("");
        expect(OrgIp.readme).toBe("https://ipinfo.io/missingauth");
    });
});
