import CreateWalletInput from "./UseCaseInput.ts";

export default interface ForgetPasswordInputPort {
  execute(input: CreateWalletInput): Promise<void>;
}
