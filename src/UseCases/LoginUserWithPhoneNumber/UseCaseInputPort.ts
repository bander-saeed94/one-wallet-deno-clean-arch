import LoginUserWithPhoneNumberInput from "./UseCaseInput.ts";

export default interface LoginUserWithPhoneNumberInputPort {
  execute(input: LoginUserWithPhoneNumberInput): Promise<void>;
}
