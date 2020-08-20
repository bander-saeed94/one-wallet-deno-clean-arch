import {
  SendOtpToPhoneNumberInput,
  SendOtpToPhoneNumberInputPort,
  SendOtpToPhoneNumberOutputPort,
} from "./mod.ts";

import UserRepo from "../port/user-repo.ts";
import EventEmitter from "../port/event-emitter.ts";
import User from "../../Entities/user.ts";
import OtpUtil from "../port/otp-util.ts";
import SmsSender from "../port/sms-sender.ts";
import OtpRepo from "../port/otp-repo.ts";
import OtpConfig from "../port/otp-config.ts";
import Otp from "../../Entities/otp.ts";

export default class RegisterUserByPhoneNumberInteractor
  implements SendOtpToPhoneNumberInputPort {
  constructor(
    private readonly otpUtil: OtpUtil,
    private readonly smsSender: SmsSender,
    private readonly otpRepo: OtpRepo,
    private readonly otpConfig: OtpConfig,
    private readonly userRepo: UserRepo,
    private eventEmitter: EventEmitter,
    private outputPort: SendOtpToPhoneNumberOutputPort,
  ) {
  }

  async execute(input: SendOtpToPhoneNumberInput): Promise<void> {
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

    let existingUser = this.userRepo.findByPhoneNumber(input.phoneNumber);
    const userExist = existingUser instanceof User;
    if (!userExist) {
      await this.outputPort.userIsNotRegistered();
      return;
    }
    const userExistAndVerified = userExist &&
      existingUser?.verifiedByPhoneNumber;
    if (userExistAndVerified) {
      await this.outputPort.userAlreadyVerified();
      return;
    }
    const timeInterval = this.otpConfig.timeInterval;
    const alg = this.otpConfig.shaAlg;
    const digits = this.otpConfig.digits;

    const otp: Otp = this.otpUtil.generate(timeInterval, alg, digits);
    this.otpRepo.create(input.phoneNumber, otp);
    this.smsSender.send(input.phoneNumber, `here is the otp ${otp.token}`);
    //emit event user has been created
    this.eventEmitter.emit(
      "otp_been_sent_to_phone_number",
      input.phoneNumber,
    );
    await this.outputPort.otpSent();
    return;
  }
}
