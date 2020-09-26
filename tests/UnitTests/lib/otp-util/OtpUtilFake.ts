import Otp from "../../../../src/Entities/Otp.ts";
import { ShaAlg } from "../../../../src/Entities/ShaAlg.ts";
import OtpUtil from "../../../../src/UseCases/port/otp-util.ts";

export default class OtpUtilFake implements OtpUtil {
  generate(timeInterval: number, alg: ShaAlg, digits: number): Otp {
    const token = (Math.floor(1000 + Math.random() * 9000)).toString();
    const secret = "secret" + token;
    return {
      token: token,
      secret: secret,
      digits: digits,
      alg: alg,
      timeInterval: timeInterval,
    };
  }
  verify(
    timeInterval: number,
    alg: ShaAlg,
    digits: number,
    enteredToken: string,
    secret: string,
  ): boolean {
    if (secret === `secret${enteredToken}`) {
      return true;
    }
    return false;
  }
}
