import PasswordHasher from "../../../../src/UseCases/port/password-hasher.ts";

export default class PassowrdHasherFake implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed${password}`;
  }
  async verify(password: string, hash: string): Promise<boolean> {
    return `hashed${password}` === hash;
  }
}
