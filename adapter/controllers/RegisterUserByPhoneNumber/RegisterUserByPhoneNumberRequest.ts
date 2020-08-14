import { RegisterUserByPhoneNumberInput } from "../../../core/usecases/RegisterUserByPhoneNumber/mod.ts";

export default class RegisterUserByPhoneNumberRequest {
  constructor(
    public readonly phoneNumber: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
  }

  public static from(
    request: RegisterUserByPhoneNumberRequest,
  ): RegisterUserByPhoneNumberInput {
    return new RegisterUserByPhoneNumberInput(
      request.phoneNumber,
      request.password,
      request.firstName,
      request.lastName,
    );
  }
}
