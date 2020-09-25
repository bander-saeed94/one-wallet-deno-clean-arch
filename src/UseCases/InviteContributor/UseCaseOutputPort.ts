import InvalidField from "../InvalidField.ts";

export default interface InviteContributorOutputPort {
  invalidInputs(fields: InvalidField[]): Promise<void>;

  noLoggedInUser(): Promise<void>;

  loggedInUserNotVerifedByPhoneNumber(): Promise<void>;

  walletNotFound(): Promise<void>;

  loggedInUserNotAdminOfTheWallet(): Promise<void>;

  invitedUserIsAlreadyAContributor(): Promise<void>;

  invitedUserHasPendingInvitation(): Promise<void>;

  invitationHasBeenSent(): Promise<void>;
}
