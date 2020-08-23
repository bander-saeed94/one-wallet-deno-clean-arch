import ResetPassword from "../../../../Entities/ResetPassword.ts";

export default interface ResetPasswordRepo {
  create(resetPassword: ResetPassword): Promise<void>;
}
