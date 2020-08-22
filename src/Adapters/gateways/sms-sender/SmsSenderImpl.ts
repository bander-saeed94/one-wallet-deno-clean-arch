import SmsSender from "../../../UseCases/port/SmsSender.ts";

export default class SmsSenderImpl implements SmsSender {
  sendOtpForVerification(otp: string, to: string): void {
    console.log(`[sendOtpForVerification] send: "${otp}", to: ${to}`);
  }
}
