import InvalidField from "../../../../src/UseCases/InvalidField.ts";
import { VerifyUserByPhoneNumberOutputPort } from "../../../../src/UseCases/VerifyUserByPhoneNumber/mod.ts";

export default class VerifyUserByPhoneNumberPresenterFake
  implements VerifyUserByPhoneNumberOutputPort {
  public invalidFields: InvalidField[] = [];
  public userHasBeenVerifiedCalled: boolean = false;
  public unmatchedTokenCalled: boolean = false;
  public userIsNotRegisteredCalled: boolean = false;
  public otpHasNotBeenGeneratedCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async userHasBeenVerified(): Promise<void> {
    this.userHasBeenVerifiedCalled = true;
  }

  async unmatchedToken(): Promise<void> {
    this.unmatchedTokenCalled = true;
  }

  async userIsNotRegistered(): Promise<void> {
    this.userIsNotRegisteredCalled = true;
  }

  async otpHasNotBeenGenerated(): Promise<void> {
    this.otpHasNotBeenGeneratedCalled = true;
  }
}
