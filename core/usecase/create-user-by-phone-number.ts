import User from "../entity/user.ts";
import UserRepo from "./port/user-repo.ts";
import IdGenerator from "./port/id-generator.ts";
import PasswordHasher from "./port/password-hasher.ts";
// import SendOtpToPhoneNumberUseCase from "./send-otp-to-phone-number.ts";

export default class CreateUserByPhoneNumberUseCase {
  constructor(
    private userRepo: UserRepo,
    private idGenerator: IdGenerator,
    private passwordHasher: PasswordHasher,
    // private sendOtpToPhoneNumberUseCase: SendOtpToPhoneNumberUseCase,
  ) {
  }

  public async createUser(
    phoneNumber: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    //validate input
    //validate user does not exist
    const user = new User(
      this.idGenerator.generate(),
      phoneNumber,
      firstName,
      lastName,
      await this.passwordHasher.hash(password),
      false,
    );
    this.userRepo.create(user);
    //send otp
    // this.sendOtpToPhoneNumberUseCase.sendOtp(phoneNumber);
    //emit event user has been created

    return user;
  }
}
