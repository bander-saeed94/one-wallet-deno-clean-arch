import { InvitationStatus } from "../../../../src/Entities/InvitationStatus.ts";
import WalletInvitation from "../../../../src/Entities/WalletInvitation.ts";
import WalletInvitationRepo from "../../../../src/UseCases/port/WalletInvitationRepo.ts";

export default class InMemoryWalletInvitationRepoFake
  implements WalletInvitationRepo {
  private walletInvitations: WalletInvitation[] = [
    new WalletInvitation(
      "04556399-233b-42a8-bb48-4aca6262e865",
      "walletAdmin28",
      "8b19fbac-5e17-4cec-a8e4-d496908b85f8",
      "966501766630",
      InvitationStatus.pending,
    ),
  ];

  async create(walletInvitation: WalletInvitation): Promise<WalletInvitation> {
    this.walletInvitations.push(walletInvitation);
    return walletInvitation;
  }

  async findByWalletIdAndPhoneNumber(
    walletId: string,
    phoneNumber: string,
  ): Promise<WalletInvitation | undefined> {
    return this.walletInvitations.find((walletInvitation) =>
      walletInvitation.walletId === walletId &&
      walletInvitation.phoneNumber === phoneNumber
    );
  }
}
