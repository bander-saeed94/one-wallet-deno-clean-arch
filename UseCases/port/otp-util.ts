import { ShaAlg } from "../../Entities/sha-alg.ts";
import Otp from "../../Entities/otp.ts";

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
