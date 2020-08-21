import User from "../../../../../src/Entities/user.ts";
import UserRepo from "../../../../../src/UseCases/port/user-repo.ts";

export default class InMemoryUserRepoFake implements UserRepo {
  private users: User[] = [
    {
      id: "a5d0f31d-8652-4210-b55f-5a13cc3c0eab",
      phoneNumber: "966501766627",
      firstName: "Bander",
      lastName: "Alshammari",
      hashedPassword: "Aa123456",
      verifiedByPhoneNumber: false,
    },
    {
      id: "8b19fbac-5e17-4cec-a8e4-d496908b85f8",
      phoneNumber: "966501766628",
      firstName: "Bander",
      lastName: "Alshammari",
      hashedPassword: "Aa123456",
      verifiedByPhoneNumber: false,
    },
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
}
