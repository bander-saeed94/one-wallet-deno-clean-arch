import { RegisterUserByPhoneNumberInputPort } from "../../../core/usecases/RegisterUserByPhoneNumber/mod.ts";
import RegisterUserByPhoneNumberRequest from "./RegisterUserByPhoneNumberRequest.ts";

export default class RegisterUserByPhoneNumberController {
  constructor(
    private readonly registerUserByPhoneNumberInputPort:
      RegisterUserByPhoneNumberInputPort,
  ) {
  }
  public async registerUser(
    registerUserByPhoneNumberRequest: RegisterUserByPhoneNumberRequest,
  ): Promise<void> {
    await this.registerUserByPhoneNumberInputPort.execute(
      RegisterUserByPhoneNumberRequest.from(registerUserByPhoneNumberRequest),
    );
  }
}
