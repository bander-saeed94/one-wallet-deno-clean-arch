import { RegisterUserByPhoneNumberOutputPort } from "../../../core/usecases/RegisterUserByPhoneNumber/mod.ts";
import InvalidField from "../../../core/usecases/InvalidField.ts";
import User from "../../../core/entity/user.ts";

export default class RegisterUserByPhoneNumberPresenter
  implements RegisterUserByPhoneNumberOutputPort {
  private modelView: string = "";

  public get response(): string {
    return this.modelView;
  }

  invalidInputs(fields: InvalidField[]): void {
    console.log(`InvalidField: ${fields.toString()}`);
    fields.forEach((field) => {
      console.log(field.field);
      console.log(field.reason);
    });
    this.modelView = fields.toString();
  }

  userAlreadyExist(existingUser: User): void {
    console.log("user already exist");
    this.modelView = "user already exist";
  }

  Ok(createdUser: User): void {
    console.log("user created");
    this.modelView = "user created";
  }
}
