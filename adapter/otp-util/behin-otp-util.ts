import OtpUtil from "../../core/usecase/port/otp-util.ts";
import { ShaAlg } from "../../core/entity/sha-alg.ts";
import Otp from "../../core/entity/otp.ts";
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
