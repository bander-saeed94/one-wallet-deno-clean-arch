import User from "../../../Entities/user.ts";

export default class RegisterUserByPhoneNumberResponse {
  constructor(
    public readonly phoneNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly verifiedByPhoneNumber: boolean,
  ) {
  }

  public static from(user: User): RegisterUserByPhoneNumberResponse {
    return new RegisterUserByPhoneNumberResponse(
      user.phoneNumber,
      user.firstName,
      user.lastName,
      user.verifiedByPhoneNumber,
    );
  }
}
