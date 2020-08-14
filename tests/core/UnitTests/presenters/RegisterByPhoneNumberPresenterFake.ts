import RegisterUserByPhoneNumberOutputPort from "../../../../core/usecases/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberOutputPort.ts";
import InvalidField from "../../../../core/usecases/InvalidField.ts";
import User from "../../../../core/entity/user.ts";

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
