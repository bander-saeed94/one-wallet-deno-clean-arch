import OtpRepo from "../../../core/usecase/port/otp-repo.ts";
import Otp from "../../../core/entity/otp.ts";

export default class InMemoryOtpRepo implements OtpRepo {
  private otps: { phoneNumber: String; otp: Otp }[] = [];

  create(phoneNumber: string, otp: Otp): void {
    this.otps.push({ phoneNumber: phoneNumber, otp: otp });
  }
  findLastByPhoneNumber(phoneNumber: string): Otp | undefined {
    return this.otps.reverse().find((otp) => otp.phoneNumber === phoneNumber)
      ?.otp;
  }
}
