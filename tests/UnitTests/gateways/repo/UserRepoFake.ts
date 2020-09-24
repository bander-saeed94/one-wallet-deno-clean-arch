import User from "../../../../src/Entities/user.ts";
import UserRepo from "../../../../src/UseCases/port/UserRepo.ts";

export default class InMemoryUserRepoFake implements UserRepo {
  private users: User[] = [
    new User(
      "a5d0f31d-8652-4210-b55f-5a13cc3c0eab",
      "966501766627",
      "Bander",
      "Alshammari",
      "hashedAa123456",
      false,
    ),
    new User(
      "8b19fbac-5e17-4cec-a8e4-d496908b85f8",
      "966501766628",
      "Bander",
      "Alshammari",
      "hashedAa123456",
      true,
    ),
    new User(
      "0e808e03-0b5d-46ca-84e2-1f98d167479d",
      "966501766629",
      "Bander",
      "Alshammari",
      "hashedAa123456",
      true,
    ),
    new User(
      "1d5f8af9-747a-4766-9515-889cc715a200",
      "966501766630",
      "Bander",
      "Alshammari",
      "hashedAa123456",
      true,
    ),
  ];
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

  async updatePasswordByPhoneNumber(
    hashedPassword: string,
    phoneNumber: string,
  ): Promise<void> {
    this.users.forEach((user) => {
      if (user.phoneNumber === phoneNumber) {
        user.hashedPassword = hashedPassword;
        return;
      }
    });
  }
}
