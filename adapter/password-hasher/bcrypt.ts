import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import PasswordHasher from "../../core/usecase/port/password-hasher.ts";

export default class BcryptHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password);
  }
  async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
