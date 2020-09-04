import User from "./user.ts";
import Deposit from "./deposit.ts";
import Loan from "./loan.ts";

export default class Wallet {
  constructor(
    public readonly id: string,
    public readonly walletName: string,
    public readonly iban: string,
    public readonly admin: User,
    public readonly contributors: User[],
    public readonly deposits: Deposit[],
    public readonly loans: Loan[],
  ) {
  }
}
