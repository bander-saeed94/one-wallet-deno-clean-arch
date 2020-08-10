import OtpConfig from "../../core/usecase/port/otp-config.ts";
import { ShaAlg } from "../../core/entity/sha-alg.ts";

export default class OtpConfigImpl implements OtpConfig {
  constructor(
    //in seconds
    public readonly timeInterval: number,
    public readonly shaAlg: ShaAlg,
    public readonly digits: number,
  ) {
  }
}
