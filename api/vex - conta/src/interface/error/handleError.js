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
        if (args === '')
            throw error;
    }
    exceptionFieldValueLessToType(args, error) {
        if (args.length < 4)
            throw error;
    }
}
exports.default = HandleError;
