export default interface SmsSender {
  sendOtpForVerification(otp: string, to: string): Promise<void>;

  sendResetPasswordLink(
    link: string,
    expireIn: Date,
    to: string,
  ): Promise<void>;
}
