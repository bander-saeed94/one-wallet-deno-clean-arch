import {
  CreateWalletInput,
  CreateWalletInputPort,
  CreateWalletOutputPort,
} from "./mod.ts";

import InvalidField from "../InvalidField.ts";
import Wallet from "../../Entities/Wallet.ts";
import IdGenerator from "../port/id-generator.ts";
import UserAuthintcation from "../port/UserAuthintcation.ts";
import WalletRepo from "../port/WalletRepo.ts";

export default class CreateWalletInteractor implements CreateWalletInputPort {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly walletRepo: WalletRepo,
    private readonly userAuthintcation: UserAuthintcation,
    private readonly outputPort: CreateWalletOutputPort,
  ) {
  }

  async execute(input: CreateWalletInput): Promise<void> {
    const loggedInUser = await this.userAuthintcation.currentUser();
    const noLoggedInUser = typeof loggedInUser === "undefined";
    if (noLoggedInUser) {
      await this.outputPort.noLoggedInUser();
      return;
    }
    const userNotVerifedByPhoneNumber = !loggedInUser?.verifiedByPhoneNumber;
    if (userNotVerifedByPhoneNumber) {
      await this.outputPort.userNotVerifedByPhoneNumber();
      return;
    }

    let invalidFields: InvalidField[] = [];
    input.iban = input.iban.replace(/\s/g, ""); //remove empty spaces

    const validSaudiIban =
      /^SA[a-zA-Z0-9]{2}\s?([0-9]{2})([a-zA-Z0-9]{2}\s?)([a-zA-Z0-9]{4}\s?){4}\s?$/;
    const ibanIsValidSaudiIban = validSaudiIban.test(input.iban);
    if (!ibanIsValidSaudiIban) {
      invalidFields.push({
        name: "iban",
        value: input.iban,
        reason: "invalidSaudiIban",
        defaultMessage: `iban: ${input.iban} is not a valid saudi iban`,
      });
    }

    const inputHasInvalidFields = invalidFields.length > 0;
    if (inputHasInvalidFields) {
      await this.outputPort.invalidInputs(invalidFields);
      return;
    }
    const wallet = new Wallet(
      this.idGenerator.generate(),
      input.walletName,
      input.iban,
      loggedInUser!,
      [loggedInUser!],
      [],
      [],
    );

    await this.walletRepo.create(wallet);
    await this.outputPort.walletHasBeenCreated(
      wallet,
    );
    return;
  }
}
