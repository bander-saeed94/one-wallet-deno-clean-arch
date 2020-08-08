import Wallet from "./wallet.ts";
import Deposit from "./deposit.ts";

export default class MonthlyDeposit extends Deposit {
  constructor(
    public readonly id: string,
    amount: number,
    to: Wallet,
    confirmed: boolean,
  ) {
    super(amount, to, confirmed);
  }
}
