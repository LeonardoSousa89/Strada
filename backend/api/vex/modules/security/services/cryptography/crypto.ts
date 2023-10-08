/** atualizar para a versão mais nova de uso do crypto */
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

const algorithm: any = process.env.ALGORITHM;

const key: any = process.env.CRYPTO_SECRET_KEY;

const strategy: any = process.env.STRATEGY;

function cipher(args: any) {
  const cryptography = crypto.createCipher(algorithm, key);
  const crypt = cryptography.update(args, "utf8", strategy);

  return crypt;
}

function decipher(args: any) {
  const cryptography = crypto.createDecipher(algorithm, key);
  const decrypt = cryptography.update(args, strategy, "utf8");

  return decrypt;
}

export { cipher, decipher };
