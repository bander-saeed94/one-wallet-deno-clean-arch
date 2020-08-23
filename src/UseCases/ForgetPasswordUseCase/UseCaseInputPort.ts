import ForgetPasswordInput from "./UseCaseInput.ts";

export default interface ForgetPasswordInputPort {
  execute(input: ForgetPasswordInput): Promise<void>;
}
