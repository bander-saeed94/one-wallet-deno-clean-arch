import SmsSender from "../../../UseCases/port/SmsSender.ts";

export default class SmsSenderImpl implements SmsSender {
  async sendOtpForVerification(otp: string, to: string): Promise<void> {
    console.log(`[sendOtpForVerification] send: "${otp}", to: ${to}`);
  }
  async sendResetPasswordLink(
    link: string,
    expireIn: Date,
    to: string,
  ): Promise<void> {
    console.log(
      `[sendResetPasswordLink] send: ${link} expire in: ${expireIn.toDateString()}, to: ${to}`,
    );
  }
}
