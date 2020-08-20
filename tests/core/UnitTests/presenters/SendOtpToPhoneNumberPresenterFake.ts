import InvalidField from "../../../../src/UseCases/InvalidField.ts";
import { SendOtpToPhoneNumberOutputPort } from "../../../../src/UseCases/SendOtpToPhoneNumber/mod.ts";

export default class SendOtpToPhoneNumberPresenterFake
  implements SendOtpToPhoneNumberOutputPort {
  public invalidFields: InvalidField[] = [];
  public otpSentCalled: boolean = false;
  public userIsAlreadyVerifiedCalled: boolean = false;
  public userIsNotRegisteredCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async otpSent(): Promise<void> {
    this.otpSentCalled = true;
  }

  async userIsAlreadyVerified(): Promise<void> {
    this.userIsAlreadyVerifiedCalled = true;
  }

  async userIsNotRegistered(): Promise<void> {
    this.userIsNotRegisteredCalled = true;
  }
}
