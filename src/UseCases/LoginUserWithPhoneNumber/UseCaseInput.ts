export default class LoginUserWithByPhoneNumberInput {
  constructor(
    public readonly phoneNumber: string,
    public readonly password: string,
  ) {
  }
}
