import {
  ResetPasswordInput,
  ResetPasswordInputPort,
  ResetPasswordOutputPort,
} from "./mod.ts";
import UserRepo from "../port/UserRepo.ts";
import PasswordHasher from "../port/password-hasher.ts";

import InvalidField from "../InvalidField.ts";
import ResetPasswordRepo from "../port/gateways/Repo/ResetPasswordRepo.ts";

export default class ResetPasswordInteractor implements ResetPasswordInputPort {
  constructor(
    private readonly resetPasswordRepo: ResetPasswordRepo,
    private readonly userRepo: UserRepo,
    private passwordHasher: PasswordHasher,
    private readonly outputPort: ResetPasswordOutputPort,
  ) {
  }

  async execute(input: ResetPasswordInput): Promise<void> {
    let invalidFields: InvalidField[] = [];

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

    const resetPassword = await this.resetPasswordRepo.findLastByLink(
      input.resetLink,
    );
    const resetPasswordNotFound = typeof resetPassword == "undefined";
    if (resetPasswordNotFound) {
      this.outputPort.resetLinkHasNotBeenFound();
      return;
    }
    const restLinkHasExpired = resetPassword!.expireIn.getTime() <
      (new Date()).getTime();

    if (restLinkHasExpired) {
      this.outputPort.resetLinkHasBeenExpired();
      return;
    }
    if (resetPassword!.used) {
      this.outputPort.resetLinkHasBeenUsed();
      return;
    }
    await this.userRepo.updatePasswordByPhoneNumber(
      await this.passwordHasher.hash(input.password),
      resetPassword!.phoneNumber,
    );
    await this.outputPort.passwordHasBeenReset();
    return;
  }
}
