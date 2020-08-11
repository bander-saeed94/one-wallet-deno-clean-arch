import UserRepo from "../../../core/usecases/port/user-repo.ts";
import User from "../../../core/entity/user.ts";

export default class InMemoryUserRepo implements UserRepo {
  private users: User[] = [];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  /** make user verified by phone number */
  verifyUserByPhoneNumber(phoneNumber: string): boolean {
    this.users.forEach((user) => {
      if (user.phoneNumber === phoneNumber) {
        user.verifiedByPhoneNumber = true;
        return true;
      }
    });
    return false;
  }

  findByPhoneNumber(phoneNumber: string): User | undefined {
    return this.users.find((user) => user.phoneNumber === phoneNumber);
  }
}
