import CreateWalletInput from "./UseCaseInput.ts";

export default interface CreateWalletInputPort {
  execute(input: CreateWalletInput): Promise<void>;
}
