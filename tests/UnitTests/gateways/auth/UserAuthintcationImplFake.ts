import UserAuthintcation from "../../../../src/UseCases/port/UserAuthintcation.ts";
import User from "../../../../src/Entities/user.ts";

export default class UserAuthintcationImplFake implements UserAuthintcation {
  public currentUserValue: User | undefined = undefined;
  async currentUser(): Promise<User | undefined> {
    return this.currentUserValue;
  }

  public setCurrentUserValue() {
    this.currentUserValue = new User(
      "id",
      "phoneNumber",
      "firstName",
      "lastName",
      "hashedPassowrd",
      true,
    );
  }

  public setCurrentUserValueNonVerifedByPhoneNumber() {
    this.currentUserValue = new User(
      "id",
      "phoneNumber",
      "firstName",
      "lastName",
      "hashedPassowrd",
      false,
    );
  }
}
