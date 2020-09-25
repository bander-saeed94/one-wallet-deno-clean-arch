import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import InviteContributorPresenterFake from "../../presenters/InviteContributorPresenterFake.ts";
import UnitTestConfig from "../../../../config/UnitTestConfig.ts";

Deno.test("Invite contributor, noLoggedInUserCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766626",
    walletId: "walletId",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, true);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, loggedInUserNotVerifedByPhoneNumberCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766627", "hashedAa123456");
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766626",
    walletId: "walletId",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, true);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, walletNotFoundCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766628", "hashedAa123456");
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766626",
    walletId: "nonExistingWalletId",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, true);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, loggedInUserNotAdminOfTheWalletCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766628", "hashedAa123456");
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766626",
    walletId: "walletAdmin27",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, true);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, invitedUserIsAlreadyAContributorCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766628", "hashedAa123456");
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766629",
    walletId: "walletAdmin28",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, true);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, invitedUserHasPendingInvitationCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766628", "hashedAa123456");
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766630",
    walletId: "walletAdmin28",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, true);
  assertEquals(presenter.invitationHasBeenSentCalled, false);
});

Deno.test("Invite contributor, invitationHasBeenSentCalled", async () => {
  let unitTestConfig = new UnitTestConfig();
  const userAuthintcation = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcation.login("966501766628", "hashedAa123456"); //wallet admin login in
  let presenter = new InviteContributorPresenterFake();
  let inviteContributorUseCase = unitTestConfig
    .inviteContributorUseCase(presenter, userAuthintcation);
  await inviteContributorUseCase.execute({
    contributorPhoneNumber: "966501766631",
    walletId: "walletAdmin28",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.loggedInUserNotVerifedByPhoneNumberCalled, false);
  assertEquals(presenter.walletNotFoundCalled, false);
  assertEquals(presenter.loggedInUserNotAdminOfTheWalletCalled, false);
  assertEquals(presenter.invitedUserIsAlreadyAContributorCalled, false);
  assertEquals(presenter.invitedUserHasPendingInvitationCalled, false);
  assertEquals(presenter.invitationHasBeenSentCalled, true);
});
