import { ShaAlg } from "../../Entities/ShaAlg.ts";
import Otp from "../../Entities/Otp.ts";

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
