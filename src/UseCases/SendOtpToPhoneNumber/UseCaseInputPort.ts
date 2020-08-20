import SendOtpToPhoneNumberInput from "./UseCaseInput.ts";

export default interface SendOtpToPhoneNumberInputPort {
  execute(input: SendOtpToPhoneNumberInput): Promise<void>;
}
