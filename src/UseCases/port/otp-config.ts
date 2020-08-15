import { ShaAlg } from "../../Entities/sha-alg.ts";

export default interface OtpConfig {
  timeInterval: number;
  shaAlg: ShaAlg;
  digits: number;
}
