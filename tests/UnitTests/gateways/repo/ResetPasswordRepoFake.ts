import ResetPassword from "../../../../src/Entities/ResetPassword.ts";
import ResetPasswordRepo from "../../../../src/UseCases/port/gateways/Repo/ResetPasswordRepo.ts";

export default class InMemoryResetPasswordRepoFake
  implements ResetPasswordRepo {
  private resetPasswords: ResetPassword[] = [];
  async create(resetPassword: ResetPassword): Promise<void> {
    this.resetPasswords.push(resetPassword);
  }
}
