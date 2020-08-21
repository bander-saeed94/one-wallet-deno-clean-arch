import {
  VerifyUserByPhoneNumberInput,
  VerifyUserByPhoneNumberInputPort,
  VerifyUserByPhoneNumberOutputPort,
} from "./mod.ts";

import UserRepo from "../port/user-repo.ts";
import OtpUtil from "../port/otp-util.ts";
import OtpRepo from "../port/otp-repo.ts";

export default class VerifyUserByPhoneNumberInteractor
  implements VerifyUserByPhoneNumberInputPort {
  constructor(
    private readonly otpUtil: OtpUtil,
    private readonly otpRepo: OtpRepo,
    private readonly userRepo: UserRepo,
    private outputPort: VerifyUserByPhoneNumberOutputPort,
  ) {
  }

  async execute(input: VerifyUserByPhoneNumberInput): Promise<void> {
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
    if (typeof user === "undefined") {
      await this.outputPort.userIsNotRegistered();
      return;
    }

    let otp = this.otpRepo.findLastByPhoneNumber(input.phoneNumber);
    if (typeof otp === "undefined") {
      await this.outputPort.otpHasNotBeenGenerated();
      return;
    }

    let verified = this.otpUtil.verify(
      otp.timeInterval,
      otp.alg,
      otp.digits,
      input.enteredToken,
      otp.secret,
    );
    if (!verified) {
      await this.outputPort.unmatchedToken();
      return;
    }
    this.userRepo.verifyUserByPhoneNumber(input.phoneNumber);
    await this.outputPort.userHasBeenVerified();
    return;
  }
}
