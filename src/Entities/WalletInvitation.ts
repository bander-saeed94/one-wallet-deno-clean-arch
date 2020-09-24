import { InvitationStatus } from "./InvitationStatus.ts";

export default class WalletInvitation {
  constructor(
    public readonly id: string,
    public readonly walletId: string,
    public readonly invitedByUserId: string,
    public readonly phoneNumber: string,
    public readonly invitationStatus: InvitationStatus =
      InvitationStatus.pending,
  ) {
  }
}
