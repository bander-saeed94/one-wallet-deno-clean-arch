import User from "../entity/user.ts";
import UserRepo from "./port/user-repo.ts";
import IdGenerator from "./port/id-generator.ts";
import PasswordHasher from "./port/password-hasher.ts";
import EventEmitter from "./port/event-emitter.ts";

export default class CreateUserByPhoneNumberUseCase {
  constructor(
    private userRepo: UserRepo,
    private idGenerator: IdGenerator,
    private passwordHasher: PasswordHasher,
    private eventEmitter: EventEmitter,
  ) {
  }

  public async createUser(
    phoneNumber: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    const saudiNumber = /^9665[0-9]{8}$/;
    if (!saudiNumber.test(phoneNumber)) {
      throw new Error(
        `phoneNumber: ${phoneNumber} is not a valid saudi number`,
      );
    }
    const acceptedPasswordLength = 8;
    if (password.length < acceptedPasswordLength) {
      throw new Error(
        `password length: ${password.length} is less than accepted ${acceptedPasswordLength}`,
      );
    }

    let userExist = this.userRepo.findByPhoneNumber(phoneNumber);
    if (typeof userExist !== "undefined") {
      throw new Error(`user with phoneNumber: ${phoneNumber} already exist`);
    }

    const user = new User(
      this.idGenerator.generate(),
      phoneNumber,
      firstName,
      lastName,
      await this.passwordHasher.hash(password),
      false,
    );
    this.userRepo.create(user);
    //emit event user has been created
    this.eventEmitter.emit(
      "user_has_been_created_with_phone_number",
      phoneNumber,
    );
    return user;
  }
}
