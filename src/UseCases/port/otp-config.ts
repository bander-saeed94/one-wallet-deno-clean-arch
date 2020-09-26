import { ShaAlg } from "../../Entities/ShaAlg.ts";

export default interface OtpConfig {
  timeInterval: number;
  shaAlg: ShaAlg;
  digits: number;
}
