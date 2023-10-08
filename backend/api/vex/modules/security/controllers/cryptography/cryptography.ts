import { cryptograph } from "../../services/cryptography/bcrypt";
import { cipher, decipher } from "../../services/cryptography/crypto";

export default class Cryptography {
  constructor() {}

  encrypt = (args: any) => cipher(args);

  decrypt = (args: any) => decipher(args);

  hash = (password: any) => cryptograph(password);
}
