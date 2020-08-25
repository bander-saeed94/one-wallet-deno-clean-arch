import InvalidField from "../InvalidField.ts";
export default interface ResetPasswordOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  resetLinkHasNotBeenFound(): Promise<void>;

  resetLinkHasBeenExpired(): Promise<void>;

  resetLinkHasBeenUsed(): Promise<void>;

  passwordHasBeenReset(): Promise<void>;
}
