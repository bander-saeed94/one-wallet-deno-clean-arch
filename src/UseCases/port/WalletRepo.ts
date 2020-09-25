import Wallet from "../../Entities/Wallet.ts";

export default interface WalletRepo {
  create(wallet: Wallet): Promise<Wallet>;

  findByWalletId(walletId: string): Promise<Wallet | undefined>;

  contributorExist(
    walletId: string,
    contributorId: string,
  ): Promise<boolean>;
}
