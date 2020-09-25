import SmsSender from "../../../../src/UseCases/port/SmsSender.ts";

export default class SmsSenderFake implements SmsSender {
  public to: string | undefined = undefined;
  public otp: string | undefined = undefined;

  async sendOtpForVerification(otp: string, to: string): Promise<void> {
    this.to = to;
    this.otp = otp;
  }

  async sendResetPasswordLink(
    link: string,
    expireIn: Date,
    to: string,
  ): Promise<void> {
  }

  async sendInvitationToBeWalletContributor(
    invitedBy: string,
    walletName: string,
    to: string,
  ): Promise<void> {
  }
}
