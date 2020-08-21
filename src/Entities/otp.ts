import { ShaAlg } from "./sha-alg.ts";

/**
 * @param token - is the number to be shared with the user
 * @param secret - not to be shared with user
 * @param alg = used to encrypt secret
 * @param timeInterval - in seconds, how long should the otp be valid
 * @param digits - number of digits of the token
 */
export default interface Otp {
  token: string;
  secret: string;
  alg: ShaAlg;
  timeInterval: number;
  digits: number;
}
