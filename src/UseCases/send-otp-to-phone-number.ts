import OtpUtil from "./port/otp-util.ts";
import SmsSender from "./port/sms-sender.ts";
import Otp from "../Entities/otp.ts";
import OtpRepo from "./port/otp-repo.ts";
import OtpConfig from "./port/otp-config.ts";
import UserRepo from "./port/user-repo.ts";

export default class SendOtpToPhoneNumberUseCase {
  constructor(
    private readonly otpUtil: OtpUtil,
    private readonly smsSender: SmsSender,
    private readonly otpRepo: OtpRepo,
    private readonly otpConfig: OtpConfig,
    private readonly userRepo: UserRepo,
  ) {
  }

  public sendOtp(to: string): string | never {
    let user = this.userRepo.findByPhoneNumber(to);
    if (typeof user === "undefined") {
      throw Error("user not registered");
    }
    if (user.verifiedByPhoneNumber) {
      throw Error("user already verified by phone number");
    }

    const timeInterval = this.otpConfig.timeInterval;
    const alg = this.otpConfig.shaAlg;
    const digits = this.otpConfig.digits;

    const otp: Otp = this.otpUtil.generate(timeInterval, alg, digits);
    this.otpRepo.create(to, otp);
    this.smsSender.send(to, `here is the otp ${otp.token}`);
    return otp.token;
  }
}
