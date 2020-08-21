export default class VerifyUserByPhoneNumberInput {
  constructor(
    public readonly phoneNumber: string,
    public readonly enteredToken: string,
  ) {
  }
}
