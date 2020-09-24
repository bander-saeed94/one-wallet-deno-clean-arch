import WalletInvitation from "../../Entities/WalletInvitation.ts";

export default interface WalletInvitationRepo {
  create(wallet: WalletInvitation): Promise<WalletInvitation>;

  findByWalletIdAndPhoneNumber(
    walletId: string,
    phoneNumber: string,
  ): Promise<WalletInvitation | undefined>;
}
