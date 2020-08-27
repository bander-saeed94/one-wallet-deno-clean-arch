import InvalidField from "../../../src/UseCases/InvalidField.ts";
import { ForgetPasswordOutputPort } from "../../../src/UseCases/ForgetPassword/mod.ts";

export default class ForgetPassowrdPresenterFake
  implements ForgetPasswordOutputPort {
  public invalidFields: InvalidField[] = [];
  public expireIn: Date | undefined = undefined;
  public userIsNotRegisteredCalled: boolean = false;
  public resetPasswordLinkIsGeneratedCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async userIsNotRegistered(): Promise<void> {
    this.userIsNotRegisteredCalled = true;
  }

  async resetPasswordLinkIsGenerated(expireIn: Date): Promise<void> {
    this.expireIn = expireIn;
    this.resetPasswordLinkIsGeneratedCalled = true;
  }
}
