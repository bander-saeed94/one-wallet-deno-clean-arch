import UserAuthintcation from "../../../UseCases/port/UserAuthintcation.ts";
import User from "../../../Entities/User.ts";

export default class UserAuthintcationImpl implements UserAuthintcation {
  async currentUser(): Promise<User | undefined> {
    return undefined;
  }
}
