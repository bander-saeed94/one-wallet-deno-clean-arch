import InvalidField from "../InvalidField.ts";
export default interface SendOtpToPhoneNumberOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  otpSent(): Promise<void>;

  userAlreadyVerified(): Promise<void>;

  userIsNotRegistered(): Promise<void>;
}
