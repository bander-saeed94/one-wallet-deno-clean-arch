import OtpUtil from "./port/otp-util.ts";
import OtpRepo from "./port/otp-repo.ts";
import UserRepo from "./port/user-repo.ts";

export default class VerifyUserByPhoneNumberUseCase {
  constructor(
    private readonly otpUtil: OtpUtil,
    private readonly otpRepo: OtpRepo,
    private readonly userRepo: UserRepo,
  ) {
  }

  public verify(phoneNumber: string, enteredToken: string): boolean {
    let otp = this.otpRepo.findLastByPhoneNumber(phoneNumber);
    if (typeof otp === "undefined") {
      throw new Error(
        `otp with provided phoneNumber: ${phoneNumber} not found`,
      );
    }
    let verified = this.otpUtil.verify(
      otp.timeInterval,
      otp.alg,
      otp.digits,
      enteredToken,
      otp.secret,
    );
    if (verified) {
      this.userRepo.verifyUserByPhoneNumber(phoneNumber);
    }
    return verified;
  }
}
