import InvalidField from "../InvalidField.ts";
export default interface ForgetPasswordOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  userIsNotRegistered(): Promise<void>;

  resetPasswordLinkIsGenerated(): Promise<void>;
}
