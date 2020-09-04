import WalletRepo from "../../../../src/UseCases/port/WalletRepo.ts";
import Wallet from "../../../../src/Entities/Wallet.ts";

export default class InMemoryWalletRepoFake implements WalletRepo {
  private wallets: Wallet[] = [];

  async create(wallet: Wallet): Promise<Wallet> {
    this.wallets.push(wallet);
    return wallet;
  }
}
