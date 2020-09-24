import InvalidField from "../../../src/UseCases/InvalidField.ts";
import { InviteContributorOutputPort } from "../../../src/UseCases/InviteContributor/mod.ts";

export default class InviteContributorPresenterFake
  implements InviteContributorOutputPort {
  public invalidFields: InvalidField[] = [];
  public noLoggedInUserCalled: boolean = false;
  public loggedInUserNotVerifedByPhoneNumberCalled: boolean = false;
  public walletNotFoundCalled: boolean = false;
  public loggedInUserNotAdminOfTheWalletCalled: boolean = false;
  public invitedUserIsAlreadyAContributorCalled: boolean = false;
  public invitedUserHasPendingInvitationCalled: boolean = false;
  public invitationHasBeenSentCalled: boolean = false;

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    this.invalidFields = fields;
  }

  async noLoggedInUser(): Promise<void> {
    this.noLoggedInUserCalled = true;
  }

  async loggedInUserNotVerifedByPhoneNumber(): Promise<void> {
    this.loggedInUserNotVerifedByPhoneNumberCalled = true;
  }

  async walletNotFound(): Promise<void> {
    this.walletNotFoundCalled = true;
  }

  async loggedInUserNotAdminOfTheWallet(): Promise<void> {
    this.loggedInUserNotAdminOfTheWalletCalled = true;
  }

  async invitedUserIsAlreadyAContributor(): Promise<void> {
    this.invitedUserIsAlreadyAContributorCalled = true;
  }

  async invitedUserHasPendingInvitation(): Promise<void> {
    this.invitedUserHasPendingInvitationCalled = true;
  }

  async invitationHasBeenSent(): Promise<void> {
    this.invitationHasBeenSentCalled = true;
  }
}
