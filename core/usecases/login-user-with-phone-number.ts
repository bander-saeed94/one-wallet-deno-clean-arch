import UserRepo from "./port/user-repo.ts";
import PasswordHasher from "./port/password-hasher.ts";
import User from "../entity/user.ts";

export default class LoginUserWithPhoneNumberUseCase {
  constructor(
    private passwordHasher: PasswordHasher,
    private readonly userRepo: UserRepo,
  ) {
  }

  public async login(phoneNumber: string, password: string): Promise<User> {
    let user = this.userRepo.findByPhoneNumber(phoneNumber);
    if (typeof user === "undefined") {
      throw new Error(
        `user with provided phoneNumber: ${phoneNumber} not found`,
      );
    }
    let passwordMatch = await this.passwordHasher.verify(
      password,
      user.hashedPassword,
    );
    if (passwordMatch) {
      return user;
    } else {
      throw new Error("password does not match");
    }
  }
}
