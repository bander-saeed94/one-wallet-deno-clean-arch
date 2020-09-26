import User from "../../Entities/User.ts";

export default interface UserAuthintcation {
  login(phoneNumber: string, password: string): Promise<void>;

  currentUser(): Promise<User | undefined>;
}
