import { cryptograph } from "../../security/cryptography/bcrypt";
import { cipher, decipher } from "../../security/cryptography/crypto";

export default class Cryptography {
  constructor() {}

  encrypt = (args: any) => cipher(args);

  decrypt = (args: any) => decipher(args);

  hash = (password: any) => cryptograph(password);
}
