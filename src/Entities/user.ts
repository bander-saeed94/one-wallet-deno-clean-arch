export default class User {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public hashedPassword: string,
    public verifiedByPhoneNumber: boolean,
  ) {
  }
}
