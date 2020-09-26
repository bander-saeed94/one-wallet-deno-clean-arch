import Deposit from "./Deposit.ts";

export default class LoanDeposit extends Deposit {
  constructor(
    public readonly id: string,
    amount: number,
    walletId: string,
    confirmed: boolean,
    public readonly loanId: string,
  ) {
    super(amount, walletId, confirmed);
  }
}
