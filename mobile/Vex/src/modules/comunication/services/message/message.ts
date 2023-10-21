import { Message } from "../../../../interface/response/message";

export default class Msg implements Message {
  message(args: string): string {
    return args;
  }
}
