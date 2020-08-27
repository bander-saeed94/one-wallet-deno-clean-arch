import ResetPassword from "../../../../src/Entities/ResetPassword.ts";
import ResetPasswordRepo from "../../../../src/UseCases/port/gateways/Repo/ResetPasswordRepo.ts";

export default class InMemoryResetPasswordRepoFake
  implements ResetPasswordRepo {
  private resetPasswords: ResetPassword[] = [
    new ResetPassword(
      "expiredResetLink",
      "0501766627",
      new Date("2020-08-26"),
      false,
    ),
    new ResetPassword(
      "usedResetLink",
      "0501766627",
      new Date("2030-01-01"),
      true,
    ),
    new ResetPassword(
      "validResetLink",
      "0501766627",
      new Date("2030-01-01"),
      false,
    ),
  ];

  async create(resetPassword: ResetPassword): Promise<void> {
    this.resetPasswords.push(resetPassword);
  }

  async findLastByLink(resetLink: string): Promise<ResetPassword | undefined> {
    return this.resetPasswords.reverse().find((resetPassword) =>
      resetPassword.id === resetLink
    );
  }
}
