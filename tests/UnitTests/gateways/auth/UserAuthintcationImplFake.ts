import UserAuthintcation from "../../../../src/UseCases/port/UserAuthintcation.ts";
import User from "../../../../src/Entities/User.ts";
import UserRepo from "../../../../src/UseCases/port/UserRepo.ts";
import PasswordHasher from "../../../../src/UseCases/port/password-hasher.ts";

export default class UserAuthintcationImplFake implements UserAuthintcation {
  public currentUserValue: User | undefined = undefined;

  constructor(
    private readonly userRepo: UserRepo,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async login(phoneNumber: string, password: string): Promise<void> {
    const user = this.userRepo.findByPhoneNumber(phoneNumber);
    const userExist = user instanceof User;
    if (!userExist) {
      return;
    }
    const passwordMatch = await this.passwordHasher.verify(
      password,
      user!.hashedPassword,
    );
    if (passwordMatch) {
    }
    this.currentUserValue = user;
  }
  async currentUser(): Promise<User | undefined> {
    return this.currentUserValue;
  }
}
