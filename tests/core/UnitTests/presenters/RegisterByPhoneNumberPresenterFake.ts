import RegisterUserByPhoneNumberOutputPort from "../../../../UseCases/RegisterUserByPhoneNumber/UseCaseOutputPort.ts";
import InvalidField from "../../../../UseCases/InvalidField.ts";
import User from "../../../../Entities/user.ts";

export default class RegisterByPhoneNumberPresenterFake
  implements RegisterUserByPhoneNumberOutputPort {
  public invalidFields: InvalidField[] = [];
  public existingUser: User | undefined;
  public createdUser: User | undefined;

  invalidInputs(fields: InvalidField[]): void {
    this.invalidFields = fields;
  }

  userAlreadyExist(existingUser: User): void {
    this.existingUser = existingUser;
  }

  Ok(createdUser: User): void {
    this.createdUser = createdUser;
  }
}
