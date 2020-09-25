import {
  LoginUserWithPhoneNumberInput,
  LoginUserWithPhoneNumberInputPort,
  LoginUserWithPhoneNumberOutputPort,
} from "./mod.ts";

import UserRepo from "../port/UserRepo.ts";
import PasswordHasher from "../port/password-hasher.ts";
import User from "../../Entities/user.ts";

export default class LoginUserWithPhoneNumberInteractor
  implements LoginUserWithPhoneNumberInputPort {
  constructor(
    private passwordHasher: PasswordHasher,
    private readonly userRepo: UserRepo,
    private outputPort: LoginUserWithPhoneNumberOutputPort,
  ) {
  }

  async execute(input: LoginUserWithPhoneNumberInput): Promise<void> {
    let invalidFields = [];

    const saudiNumber = /^9665[0-9]{8}$/;
    const invalidSaudiNumber = !saudiNumber.test(input.phoneNumber);
    if (invalidSaudiNumber) {
      invalidFields.push({
        name: "phoneNumber",
        value: input.phoneNumber,
        reason: "invalidSaudiNumber",
        defaultMessage:
          `phoneNumber: ${input.phoneNumber} is not a valid saudi number`,
      });
    }
    const minimumPasswordLength = 8;
    const shortPassword = input.password.length < minimumPasswordLength;
    if (shortPassword) {
      invalidFields.push({
        name: "password",
        value: input.password,
        reason: "shortPassword",
        defaultMessage:
          `password length: ${input.password.length} is less than minimum password length ${minimumPasswordLength}`,
      });
    }
    const inputHasInvalidFields = invalidFields.length > 0;
    if (inputHasInvalidFields) {
      await this.outputPort.invalidInputs(invalidFields);
      return;
    }

    let user = this.userRepo.findByPhoneNumber(input.phoneNumber);
    let userIsNotRegistered = !(user instanceof User);
    if (userIsNotRegistered) {
      await this.outputPort.userIsNotRegistered();
      return;
    }

    let passwordMatch = await this.passwordHasher.verify(
      input.password,
      user!.hashedPassword,
    );

    if (!passwordMatch) {
      await this.outputPort.unmatchedPassword();
      return;
    }
    await this.outputPort.userLoggedIn(user!);
    return;
  }
}
