import { ShaAlg } from "../../entity/sha-alg.ts";
import Otp from "../../entity/otp.ts";

export default interface OtpUtil {
  generate(timeInterval: number, alg: ShaAlg, digits: number): Otp;
  verify(
    timeInterval: number,
    alg: ShaAlg,
    digits: number,
    enteredToken: string,
    secret: string,
  ): boolean;
}
