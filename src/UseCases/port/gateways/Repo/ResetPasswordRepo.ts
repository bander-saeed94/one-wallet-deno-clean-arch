import ResetPassword from "../../../../Entities/ResetPassword.ts";

export default interface ResetPasswordRepo {
  create(user: ResetPassword): Promise<ResetPassword>;
}
