import Wallet from "./wallet.ts";

export default abstract class Deposit {
  constructor(
    public readonly amount: number,
    public readonly to: Wallet,
    public readonly confirmed: boolean,
  ) {
  }
}
