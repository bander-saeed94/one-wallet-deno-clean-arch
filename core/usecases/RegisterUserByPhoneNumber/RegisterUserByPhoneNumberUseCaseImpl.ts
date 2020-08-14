import RegisterUserByPhoneNumberUseCase from "./RegisterUserByPhoneNumberUseCase.ts";
import RegisterUserByPhoneNumberInput from "./RegisterUserByPhoneNumberInput.ts";
import UserRepo from "../port/user-repo.ts";
import IdGenerator from "../port/id-generator.ts";
import PasswordHasher from "../port/password-hasher.ts";
import EventEmitter from "../port/event-emitter.ts";
import User from "../../entity/user.ts";
import RegisterUserByPhoneNumberOutputPort from "./RegisterUserByPhoneNumberOutputPort.ts";

export default class RegisterUserByPhoneNumberUseCaseImpl
  implements RegisterUserByPhoneNumberUseCase {
  private outputPort: RegisterUserByPhoneNumberOutputPort | undefined;
  constructor(
    private userRepo: UserRepo,
    private idGenerator: IdGenerator,
    private passwordHasher: PasswordHasher,
    private eventEmitter: EventEmitter,
  ) {
  }

  setOutputPort(outputPort: RegisterUserByPhoneNumberOutputPort): void {
    this.outputPort = outputPort;
  }

  async execute(input: RegisterUserByPhoneNumberInput): Promise<void> {
    let invalidFields = [];

    const saudiNumber = /^9665[0-9]{8}$/;
    const invalidSaudiNumber = !saudiNumber.test(input.phoneNumber);
    if (invalidSaudiNumber) {
      invalidFields.push({
        field: "phoneNumber",
        value: input.phoneNumber,
        reason: "invalidSaudiNumber",
        defaultMessage:
          `phoneNumber: ${input.phoneNumber} is not a valid saudi number`,
      });
    }
    const minimumPasswordLength = 8;
    const shortPassword = input.password.length < minimumPasswordLength;
    if (shortPassword) {
      invalidFields.push({
        field: "password",
        value: input.password,
        reason: "shortPassword",
        defaultMessage:
          `password length: ${input.password.length} is less than minimumPasswordLength ${minimumPasswordLength}`,
      });
    }
    const inputHasInvalidFields = invalidFields.length > 0;
    if (inputHasInvalidFields) {
      this.outputPort?.invalidInputs(invalidFields);
      return;
    }

    let existingUser = this.userRepo.findByPhoneNumber(input.phoneNumber);
    let userExist = existingUser instanceof User;
    if (userExist) {
      this.outputPort?.userAlreadyExist(existingUser as User);
      return;
    }

    const user = new User(
      this.idGenerator.generate(),
      input.phoneNumber,
      input.firstName,
      input.lastName,
      await this.passwordHasher.hash(input.password),
      false,
    );
    this.userRepo.create(user);
    //emit event user has been created
    this.eventEmitter.emit(
      "user_has_been_created_with_phone_number",
      input.phoneNumber,
    );
    this.outputPort?.Ok(user);
    return;
  }
}
