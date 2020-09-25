import User from "../../Entities/user.ts";

export default interface UserAuthintcation {
  login(phoneNumber: string, password: string): Promise<void>;

  currentUser(): Promise<User | undefined>;
}
