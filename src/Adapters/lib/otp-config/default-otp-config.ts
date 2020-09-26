import OtpConfig from "../../../UseCases/port/otp-config.ts";
import { ShaAlg } from "../../../Entities/ShaAlg.ts";

export default class OtpConfigImpl implements OtpConfig {
  constructor(
    //in seconds
    public readonly timeInterval: number,
    public readonly shaAlg: ShaAlg,
    public readonly digits: number,
  ) {
  }
}
