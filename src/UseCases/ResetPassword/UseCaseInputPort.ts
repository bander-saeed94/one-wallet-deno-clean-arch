import ResetPasswordInput from "./UseCaseInput.ts";

export default interface ResetPasswordInputPort {
  execute(input: ResetPasswordInput): Promise<void>;
}
