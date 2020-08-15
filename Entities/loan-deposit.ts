import Wallet from "./wallet.ts";
import Deposit from "./deposit.ts";
import Loan from "./loan.ts";

export default class LoanDeposit extends Deposit {
  constructor(
    public readonly id: string,
    amount: number,
    to: Wallet,
    confirmed: boolean,
    public readonly Loan: Loan,
  ) {
    super(amount, to, confirmed);
  }
}
