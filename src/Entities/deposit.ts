export default abstract class Deposit {
  constructor(
    public readonly amount: number,
    public readonly walletId: string,
    public readonly confirmed: boolean,
  ) {
  }
}
