import InvalidField from "../InvalidField.ts";
import User from "../../Entities/User.ts";
export default interface RegisterUserByPhoneNumberOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  userAlreadyExist(existingUser: User): Promise<void>;

  Ok(createdUser: User): Promise<void>;
}
