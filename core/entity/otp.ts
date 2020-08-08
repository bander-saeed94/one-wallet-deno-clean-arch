import { ShaAlg } from "./sha-alg.ts";

export default interface Otp {
  token: string;
  secret: string;
  alg: ShaAlg;
  timeInterval: number;
  digits: number;
}
