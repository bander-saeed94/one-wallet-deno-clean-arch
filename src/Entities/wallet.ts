export default class Wallet {
  constructor(
    public readonly id: string,
    public readonly walletName: string,
    public readonly iban: string,
    public readonly adminId: string,
    public readonly contributorsId: string[],
    public readonly depositsId: string[],
    public readonly loansId: string[],
  ) {
  }
}
