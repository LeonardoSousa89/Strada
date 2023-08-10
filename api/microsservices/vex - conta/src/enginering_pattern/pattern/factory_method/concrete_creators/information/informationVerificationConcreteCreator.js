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
exports.InformationVerificationConcreteCreator = void 0;
const knex_1 = __importDefault(require("../../../../../repositories/knex/knex"));
class InformationVerificationConcreteCreator {
    constructor(id, starting_km, final_km) {
        this.id = id;
        this.starting_km = starting_km;
        this.final_km = final_km;
    }
    verifyId() {
        return __awaiter(this, void 0, void 0, function* () {
            const existsOrNotExistsId = yield knex_1.default.where('information_id', this.id)
                .from('vex_schema.information')
                .first();
            if (existsOrNotExistsId)
                return true;
            if (!existsOrNotExistsId)
                return false;
        });
    }
    verifyInformation() {
        if (this.starting_km === null &&
            this.final_km === null)
            return false;
        if (this.starting_km === '' &&
            this.final_km === '')
            return false;
        if (this.starting_km === null &&
            this.final_km === '')
            return false;
        if (this.starting_km === '' &&
            this.final_km === null)
            return false;
    }
    verify(typeOfVerification) {
        switch (typeOfVerification) {
            case typeOfVerification === 'id': return this.verifyId();
            case typeOfVerification === 'km': return this.verifyInformation();
            default:
                break;
        }
    }
}
exports.InformationVerificationConcreteCreator = InformationVerificationConcreteCreator;
