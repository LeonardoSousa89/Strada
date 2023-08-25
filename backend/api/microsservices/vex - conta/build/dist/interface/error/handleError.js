"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandleError {
    constructor() { }
    exceptionFieldNullOrUndefined(args, error) {
        if (args === null || args === undefined)
            throw error;
    }
    exceptionFieldIsEqualZero(args, error) {
        if (args === 0)
            throw error;
    }
    exceptionFieldIsEmpty(args, error) {
        if (args === "")
            throw error;
    }
    exceptionFieldValueLessToType(args, error) {
        if (args.length < 4)
            throw error;
    }
    //aqui por observações em testes, este valor está equivalendo[valor relativo] a varchar(250) no banco [verificar por quê]
    exceptionFieldValueMoreThanToType(args, error) {
        if (args.length > 120)
            throw error;
    }
}
exports.default = HandleError;
