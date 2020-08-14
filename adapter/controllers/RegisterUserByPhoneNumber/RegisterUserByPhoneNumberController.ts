import { RegisterUserByPhoneNumberInputPort } from "../../../core/usecases/RegisterUserByPhoneNumber/mod.ts";
import RegisterUserByPhoneNumberRequest from "./RegisterUserByPhoneNumberRequest.ts";

export default class RegisterUserByPhoneNumberController {
  constructor(
    private readonly registerUserByPhoneNumberInputPort:
      RegisterUserByPhoneNumberInputPort,
  ) {
  }
  public registerUser(
    registerUserByPhoneNumberRequest: RegisterUserByPhoneNumberRequest,
  ) {
    this.registerUserByPhoneNumberInputPort.execute(
      RegisterUserByPhoneNumberRequest.from(registerUserByPhoneNumberRequest),
    );
  }
}
