import InvalidField from "../../../src/UseCases/InvalidField.ts";
import { ForgetPasswordOutputPort } from "../../../src/UseCases/ForgetPassword/mod.ts";

export default class ForgetPassowrdPresenterFake
  implements ForgetPasswordOutputPort {
  public invalidFields: InvalidField[] = [];
  public userIsNotRegisteredCalled: boolean = false;
  public resetPasswordLinkIsGeneratedCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async userIsNotRegistered(): Promise<void> {
    this.userIsNotRegisteredCalled = true;
  }

  async resetPasswordLinkIsGenerated(): Promise<void> {
    this.resetPasswordLinkIsGeneratedCalled = true;
  }
}
