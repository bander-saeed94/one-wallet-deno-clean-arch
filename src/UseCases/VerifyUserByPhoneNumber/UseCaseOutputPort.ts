import InvalidField from "../InvalidField.ts";
export default interface SendOtpToPhoneNumberOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  userHasBeenVerified(): Promise<void>;

  unmatchedToken(): Promise<void>;

  userIsNotRegistered(): Promise<void>;

  otpHasNotBeenGenerated(): Promise<void>;
}
