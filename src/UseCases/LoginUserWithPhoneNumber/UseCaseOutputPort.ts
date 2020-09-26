import InvalidField from "../InvalidField.ts";
import User from "../../Entities/User.ts";
export default interface LoginUserWithPhoneNumberOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  userIsNotRegistered(): Promise<void>;

  userLoggedIn(user: User): Promise<void>;

  unmatchedPassword(): Promise<void>;
}
