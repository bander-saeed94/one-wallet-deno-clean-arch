import User from "../../Entities/user.ts";

export default interface UserRepo {
  create(user: User): User;

  /** make user verified by phone number */
  verifyUserByPhoneNumber(phoneNumber: string): boolean;

  findByPhoneNumber(phoneNumber: string): User | undefined;

  updatePasswordByPhoneNumber(
    hashedPassword: string,
    phoneNumber: string,
  ): Promise<void>;
}
