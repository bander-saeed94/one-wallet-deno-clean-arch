import Wallet from "./wallet.ts";
import Deposit from "./deposit.ts";

export default class MonthlyDeposit extends Deposit {
  constructor(
    public readonly id: string,
    amount: number,
    walletId: string,
    confirmed: boolean,
  ) {
    super(amount, walletId, confirmed);
  }
}
