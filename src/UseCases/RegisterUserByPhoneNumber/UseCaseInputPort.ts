import RegisterUserByPhoneNumberInput from "./UseCaseInput.ts";

export default interface RegisterUserByPhoneNumberInputPort {
  execute(input: RegisterUserByPhoneNumberInput): Promise<void>;
}
