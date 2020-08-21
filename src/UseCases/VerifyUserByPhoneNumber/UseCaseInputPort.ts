import VerifyUserByPhoneNumberInput from "./UseCaseInput.ts";

export default interface VerifyUserByPhoneNumberInputPort {
  execute(input: VerifyUserByPhoneNumberInput): Promise<void>;
}
