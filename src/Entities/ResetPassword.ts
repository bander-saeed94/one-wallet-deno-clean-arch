/**
 * @param id - link to be share with user
 * @param phoneNumber - 
 * @param expireIn - in Date
 * @param expireIn - have been used to reset password
 */
export default class ResetPassword {
  constructor(
    public readonly id: string,
    public readonly phoneNumber: string,
    public readonly expireIn: Date,
    public readonly used: boolean = false,
  ) {
  }
}
