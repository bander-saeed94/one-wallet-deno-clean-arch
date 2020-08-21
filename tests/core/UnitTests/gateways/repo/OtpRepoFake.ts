import OtpRepo from "../../../../../src/UseCases/port/otp-repo.ts";
import Otp from "../../../../../src/Entities/otp.ts";

export default class InMemoryOtpRepoFake implements OtpRepo {
  private otps: { phoneNumber: String; otp: Otp }[] = [];

  create(phoneNumber: string, otp: Otp): void {
    this.otps.push({ phoneNumber: phoneNumber, otp: otp });
  }
  findLastByPhoneNumber(phoneNumber: string): Otp | undefined {
    return this.otps.reverse().find((otp) => otp.phoneNumber === phoneNumber)
      ?.otp;
  }
}
