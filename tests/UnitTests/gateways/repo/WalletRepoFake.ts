import WalletRepo from "../../../../src/UseCases/port/WalletRepo.ts";
import Wallet from "../../../../src/Entities/Wallet.ts";

export default class InMemoryWalletRepoFake implements WalletRepo {
  private wallets: Wallet[] = [
    new Wallet("walletIdNotAdmin", "testing wallet ", "iban", "", [], [], []),
    new Wallet(
      "walletAdmin27",
      "testing wallet ",
      "iban",
      "a5d0f31d-8652-4210-b55f-5a13cc3c0eab",
      ["a5d0f31d-8652-4210-b55f-5a13cc3c0eab"],
      [],
      [],
    ),
    new Wallet(
      "walletAdmin28",
      "testing wallet ",
      "iban",
      "8b19fbac-5e17-4cec-a8e4-d496908b85f8",
      [
        "8b19fbac-5e17-4cec-a8e4-d496908b85f8",
        "0e808e03-0b5d-46ca-84e2-1f98d167479d",
      ],
      [],
      [],
    ),
  ];

  async create(wallet: Wallet): Promise<Wallet> {
    this.wallets.push(wallet);
    return wallet;
  }
  async findByWalletId(walletId: string): Promise<Wallet | undefined> {
    return this.wallets.find((wallet) => wallet.id === walletId);
  }

  async contributorExist(
    walletId: string,
    contributorId: string,
  ): Promise<boolean> {
    const wallet = await this.findByWalletId(walletId);
    const walletNotFound = typeof wallet === "undefined";
    if (walletNotFound) {
      return false;
    }
    const contributor = wallet!.contributorsId.find((id) => {
      return id === contributorId;
    });
    const contributorNotFound = typeof contributor === "undefined";
    if (contributorNotFound) {
      return false;
    }
    return true;
  }
}
