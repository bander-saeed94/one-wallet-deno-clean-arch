import InvalidField from "../../../../src/UseCases/InvalidField.ts";
import { LoginUserWithPhoneNumberOutputPort } from "../../../../src/UseCases/LoginUserWithPhoneNumber/mod.ts";
import User from "../../../../src/Entities/user.ts";

export default class LoginUserWithPhoneNumberPresenterFake
  implements LoginUserWithPhoneNumberOutputPort {
  public invalidFields: InvalidField[] = [];
  public user: User | undefined = undefined;
  public userIsNotRegisteredCalled: boolean = false;
  public userLoggedInCalled: boolean = false;
  public unmatchedPasswordCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async userIsNotRegistered(): Promise<void> {
    this.userIsNotRegisteredCalled = true;
  }

  async userLoggedIn(user: User): Promise<void> {
    this.user = user;
    this.userLoggedInCalled = true;
  }

  async unmatchedPassword(): Promise<void> {
    this.unmatchedPasswordCalled = true;
  }
}
