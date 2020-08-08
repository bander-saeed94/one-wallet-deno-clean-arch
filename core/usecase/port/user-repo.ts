import User from "../../entity/user.ts";

export default interface UserRepo {
  create(user: User): User;

  /** make user verified by phone number */
  verifyUserByPhoneNumber(phoneNumber: string): boolean;

  findByPhoneNumber(phoneNumber: string): User | undefined;
}
