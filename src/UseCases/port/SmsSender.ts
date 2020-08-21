export default interface SmsSender {
  sendOtpForVerification(otp: string, to: string): void;
}
