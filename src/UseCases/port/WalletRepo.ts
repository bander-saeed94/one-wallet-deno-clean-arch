import Wallet from "../../Entities/Wallet.ts";

export default interface WalletRepo {
  create(wallet: Wallet): Promise<Wallet>;
}
