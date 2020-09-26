import {
  ForgetPasswordInput,
  ForgetPasswordInputPort,
  ForgetPasswordOutputPort,
} from "./mod.ts";

import UserRepo from "../port/UserRepo.ts";
import User from "../../Entities/User.ts";
import ResetPasswordRepo from "../port/gateways/Repo/ResetPasswordRepo.ts";
import ResetPassword from "../../Entities/ResetPassword.ts";
import IdGenerator from "../port/id-generator.ts";
import SmsSender from "../port/SmsSender.ts";

export default class ForgetPasswordInteractor
  implements ForgetPasswordInputPort {
  constructor(
    private readonly resetPasswordRepo: ResetPasswordRepo,
    private readonly userRepo: UserRepo,
    private readonly idGenerator: IdGenerator,
    private readonly smsSender: SmsSender,
    private readonly outputPort: ForgetPasswordOutputPort,
  ) {
  }

  async execute(input: ForgetPasswordInput): Promise<void> {
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
    let expireIn = new Date();
    expireIn.setDate(expireIn.getDate() + 1); //one day later
    let resetPassword = new ResetPassword(
      this.idGenerator.generate(),
      input.phoneNumber,
      expireIn,
    );

    const saveResetPassword = this.resetPasswordRepo.create(resetPassword);
    const sendResetPasswordLink = this.smsSender.sendResetPasswordLink(
      resetPassword.id,
      resetPassword.expireIn,
      resetPassword.phoneNumber,
    );
    const presentResetPasswordLinkIsGenerated = this.outputPort
      .resetPasswordLinkIsGenerated(expireIn);

    let awaitIterable = [
      saveResetPassword,
      sendResetPasswordLink,
      presentResetPasswordLinkIsGenerated,
    ];
    for await (let ss of awaitIterable) {}
    return;
  }
}
