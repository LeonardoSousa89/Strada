import { Err } from "./error";

export default class HandleError implements Err {
  constructor() {}

  exceptionFieldNullOrUndefined(args: any, error: any) {
    if (args === null || args === undefined) throw error;
  }

  exceptionFieldIsEqualZero(args: any, error: any) {
    if (args === 0) throw error;
  }

  exceptionFieldIsEmpty(args: any, error: any) {
    if (args === "") throw error;
  }

  exceptionFieldValueLessToType(args: any, error: any) {
    if (args.length < 4) throw error;
  }

  //aqui por observações em testes, este valor está equivalendo[valor relativo] a varchar(250) no banco [verificar por quê]
  exceptionFieldValueMoreThanToType(args: any, error: any) {
    if (args.length > 120) throw error;
  }
}
