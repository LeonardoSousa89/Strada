export interface Err {

    exceptionFieldNullOrUndefined(args: any, error: any): any 
    exceptionFieldIsEqualZero(args: any, error: any): any
    exceptionFieldIsEmpty(args: any, error: any): any
    exceptionFieldValueLessToType(args: any, error: any): any
}