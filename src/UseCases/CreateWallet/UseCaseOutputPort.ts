import InvalidField from "../InvalidField.ts";

import Wallet from "../../Entities/Wallet.ts";

export default interface CreateWalletOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  walletHasBeenCreated(wallet: Wallet): Promise<void>;

  noLoggedInUser(): Promise<void>;

  userNotVerifedByPhoneNumber(): Promise<void>;
}
