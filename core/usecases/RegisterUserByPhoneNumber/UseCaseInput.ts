export default class RegisterUserByPhoneNumberInput {
  constructor(
    public readonly phoneNumber: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
  }
}
