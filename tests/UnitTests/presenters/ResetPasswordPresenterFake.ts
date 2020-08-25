import InvalidField from "../../../src/UseCases/InvalidField.ts";
import { ResetPasswordOutputPort } from "../../../src/UseCases/ResetPassword/mod.ts";

export default class ResetPasswordPresenterFake
  implements ResetPasswordOutputPort {
  public invalidFields: InvalidField[] = [];
  public resetLinkHasNotBeenFoundCalled: boolean = false;
  public resetLinkHasBeenExpiredCalled: boolean = false;
  public resetLinkHasBeenUsedCalled: boolean = false;
  public passwordHasBeenResetCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }
  async resetLinkHasNotBeenFound(): Promise<void> {
    this.resetLinkHasNotBeenFoundCalled = true;
  }
  async resetLinkHasBeenExpired(): Promise<void> {
    this.resetLinkHasBeenExpiredCalled = true;
  }
  async resetLinkHasBeenUsed(): Promise<void> {
    this.resetLinkHasBeenUsedCalled = true;
  }

  async passwordHasBeenReset(): Promise<void> {
    this.passwordHasBeenResetCalled = true;
  }
}
