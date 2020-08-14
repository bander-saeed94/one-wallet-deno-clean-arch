import RegisterUserByPhoneNumberInput from "./RegisterUserByPhoneNumberInput.ts";
import RegisterUserByPhoneNumberOutputPort from "./RegisterUserByPhoneNumberOutputPort.ts";

export default interface RegisterUserByPhoneNumberUseCase {
  execute(input: RegisterUserByPhoneNumberInput): Promise<void>;
  setOutputPort(outputPort: RegisterUserByPhoneNumberOutputPort): void;
}
