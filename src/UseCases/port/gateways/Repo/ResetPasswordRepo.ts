import ResetPassword from "../../../../Entities/ResetPassword.ts";

export default interface ResetPasswordRepo {
  create(resetPassword: ResetPassword): Promise<void>;

  findLastByLink(resetLink: string): Promise<ResetPassword | undefined>;
}
