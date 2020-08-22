import RegisterUserByPhoneNumberOutputPort from "../../../src/UseCases/RegisterUserByPhoneNumber/UseCaseOutputPort.ts";
import InvalidField from "../../../src/UseCases/InvalidField.ts";
import User from "../../../src/Entities/user.ts";

export default class RegisterByPhoneNumberPresenterFake
  implements RegisterUserByPhoneNumberOutputPort {
  public invalidFields: InvalidField[] = [];
  public existingUser: User | undefined;
  public createdUser: User | undefined;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async userAlreadyExist(existingUser: User): Promise<void> {
    this.existingUser = existingUser;
  }

  async Ok(createdUser: User): Promise<void> {
    this.createdUser = createdUser;
  }
}
