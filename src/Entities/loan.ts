import Wallet from "./Wallet.ts";

export default class Loan {
  constructor(
    public readonly id: string,
    public readonly amount: number,
    public readonly from: Wallet,
    public readonly confirmed: boolean,
  ) {
  }
}
