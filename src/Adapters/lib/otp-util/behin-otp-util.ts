import OtpUtil from "../../../UseCases/port/otp-util.ts";
import { ShaAlg } from "../../../Entities/ShaAlg.ts";
import Otp from "../../../Entities/Otp.ts";
import Behin from "https://deno.land/x/behin/mod.ts";

export default class BehinOtp implements OtpUtil {
  generate(timeInterval: number, alg: ShaAlg, digits: number): Otp {
    const secret = Behin.generateSecret();
    const token = Behin.totp.generate(secret, {
      step: timeInterval,
      digits: digits,
      alg: ShaAlg[alg],
    });
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
    const isValid = Behin.totp.verify(secret, enteredToken, {
      step: timeInterval,
      digits: digits,
      alg: ShaAlg[alg],
    });
    return isValid;
  }
}
