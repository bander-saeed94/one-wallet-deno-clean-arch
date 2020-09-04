import InvalidField from "../../../src/UseCases/InvalidField.ts";
import { CreateWalletOutputPort } from "../../../src/UseCases/CreateWallet/mod.ts";
import Wallet from "../../../src/Entities/Wallet.ts";

export default class CreateWalletPresenterFake
  implements CreateWalletOutputPort {
  public invalidFields: InvalidField[] = [];
  public wallet: Wallet | undefined = undefined;
  public walletHasBeenCreatedCalled: boolean = false;
  public noLoggedInUserCalled: boolean = false;
  public userNotVerifedByPhoneNumberCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async walletHasBeenCreated(wallet: Wallet) {
    this.wallet = wallet;
    this.walletHasBeenCreatedCalled = true;
  }

  async noLoggedInUser() {
    this.noLoggedInUserCalled = true;
  }

  async userNotVerifedByPhoneNumber(): Promise<void> {
    this.userNotVerifedByPhoneNumberCalled = true;
  }
}
