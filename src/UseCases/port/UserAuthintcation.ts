import User from "../../Entities/user.ts";

export default interface UserAuthintcation {
  currentUser(): Promise<User | undefined>;
}
