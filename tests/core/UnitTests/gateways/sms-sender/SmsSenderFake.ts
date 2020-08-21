import SmsSender from "../../../../../src/UseCases/port/SmsSender.ts";

export default class SmsSenderFake implements SmsSender {
  public to: string | undefined = undefined;
  public otp: string | undefined = undefined;
  sendOtpForVerification(otp: string, to: string): void {
    this.to = to;
    this.otp = otp;
  }
}
