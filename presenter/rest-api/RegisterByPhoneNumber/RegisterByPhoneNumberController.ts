import RegisterUserByPhoneNumberUseCase from "../../../core/usecases/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberUseCase.ts";
import RegisterUserByPhoneNumberOutputPort from "../../../core/usecases/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberOutputPort.ts";
import User from "../../../core/entity/user.ts";
import InvalidField from "../../../core/usecases/InvalidField.ts";
import RegisterUserByPhoneNumberInput from "../../../core/usecases/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberInput.ts";
import RegisterByPhoneNumberResource from "./RegisterByPhoneNumberResource.ts";
import UserResponse from "../entities/UserResponse.ts";
import BadRequestResponse from "../entities/BadRequestResponse.ts";

export default class RegisterByPhoneNumberController
  implements
    RegisterByPhoneNumberResource,
    RegisterUserByPhoneNumberOutputPort {
  private user: UserResponse | undefined;
  private badRequest: boolean = false;
  private badRequestMessage: string = "default bad request message";

  constructor(
    private registerUserByPhoneNumberUseCaseImpl:
      RegisterUserByPhoneNumberUseCase,
  ) {
    this.registerUserByPhoneNumberUseCaseImpl.setOutputPort(this);
  }

  async register(
    input: RegisterUserByPhoneNumberInput,
  ): Promise<UserResponse | BadRequestResponse> {
    await this.registerUserByPhoneNumberUseCaseImpl.execute(input);
    if (this.badRequest) {
      return new BadRequestResponse(this.badRequestMessage);
    }
    if (this.user) {
      return this.user;
    }
    return new BadRequestResponse("No idea why reaches this.");
  }

  invalidInputs(fields: InvalidField[]): void {
    this.badRequest = true;
    this.badRequestMessage = fields.toString();
  }

  userAlreadyExist(existingUser: User): void {
    this.badRequest = true;
    this.badRequestMessage = `user already registered ${existingUser}`;
  }

  Ok(createdUser: User): void {
    this.user = UserResponse.from(createdUser);
  }
}
