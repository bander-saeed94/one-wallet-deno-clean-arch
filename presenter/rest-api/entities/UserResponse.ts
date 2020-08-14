import User from "../../../core/entity/user.ts";

export default class UserResponse {
  constructor(
    public readonly phoneNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public verifiedByPhoneNumber: boolean,
  ) {
  }

  public static from(user: User): UserResponse {
    return new UserResponse(
      user.phoneNumber,
      user.firstName,
      user.lastName,
      user.verifiedByPhoneNumber,
    );
  }
}
