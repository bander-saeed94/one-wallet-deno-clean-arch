export default class ResetPasswordInput {
  constructor(
    public readonly resetLink: string,
    public readonly password: string,
  ) {
  }
}
