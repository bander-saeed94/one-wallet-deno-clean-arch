import InvalidField from "../InvalidField.ts";
import User from "../../Entities/user.ts";
export default interface RegisterUserByPhoneNumberOutputPort {
  invalidInputs(fields: InvalidField[]): void;

  userAlreadyExist(existingUser: User): void;

  Ok(createdUser: User): void;
}
