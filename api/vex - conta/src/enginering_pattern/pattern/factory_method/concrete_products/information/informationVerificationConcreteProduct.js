"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationInformationConcreteProduct = void 0;
const informationVerificationConcreteCreator_1 = require("../../concrete_creators/information/informationVerificationConcreteCreator");
const verificationCreator_1 = require("../../creators/verificationCreator");
class VerificationInformationConcreteProduct extends verificationCreator_1.VerificationFactory {
    verify(typeOfVerification, id, starting_km, final_km) {
        var data;
        switch (typeOfVerification) {
            case typeOfVerification === 'id':
                data = new informationVerificationConcreteCreator_1.InformationVerificationConcreteCreator('id', id).verifyId();
                break;
            case typeOfVerification === 'km':
                data = new informationVerificationConcreteCreator_1.InformationVerificationConcreteCreator('km', starting_km, final_km).verifyInformation();
                break;
            default:
                break;
        }
        return data;
    }
    verification() {
        return this.verify();
    }
}
exports.VerificationInformationConcreteProduct = VerificationInformationConcreteProduct;
