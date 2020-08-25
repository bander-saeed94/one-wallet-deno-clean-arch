import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import UnitTestConfig from "../../../../config/UnitTestConfig.ts";
import ResetPasswordPresenterFake from "../../presenters/ResetPasswordPresenterFake.ts";

Deno.test("Given Reset Link Does not exist", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ResetPasswordPresenterFake();
  let resetPasswordUseCase = unitTestConfig
    .resetPasswordUseCase(presenter);
  await resetPasswordUseCase.execute({
    resetLink: "nonExistingResetLink",
    password: "newPassword",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.resetLinkHasNotBeenFoundCalled, true);
  assertEquals(presenter.resetLinkHasBeenExpiredCalled, false);
  assertEquals(presenter.resetLinkHasBeenUsedCalled, false);
  assertEquals(presenter.passwordHasBeenResetCalled, false);
});

Deno.test("Given Reset Link Has Been Expired", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ResetPasswordPresenterFake();
  let resetPasswordUseCase = unitTestConfig
    .resetPasswordUseCase(presenter);
  await resetPasswordUseCase.execute({
    resetLink: "expiredResetLink",
    password: "newPassword",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.resetLinkHasNotBeenFoundCalled, false);
  assertEquals(presenter.resetLinkHasBeenExpiredCalled, true);
  assertEquals(presenter.resetLinkHasBeenUsedCalled, false);
  assertEquals(presenter.passwordHasBeenResetCalled, false);
});

Deno.test("Given Reset Link Has Been Used", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ResetPasswordPresenterFake();
  let resetPasswordUseCase = unitTestConfig
    .resetPasswordUseCase(presenter);
  await resetPasswordUseCase.execute({
    resetLink: "usedResetLink",
    password: "newPassword",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.resetLinkHasNotBeenFoundCalled, false);
  assertEquals(presenter.resetLinkHasBeenExpiredCalled, false);
  assertEquals(presenter.resetLinkHasBeenUsedCalled, true);
  assertEquals(presenter.passwordHasBeenResetCalled, false);
});

Deno.test("Given Valid Rest Link, Than Password reset successfully", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ResetPasswordPresenterFake();
  let resetPasswordUseCase = unitTestConfig
    .resetPasswordUseCase(presenter);
  await resetPasswordUseCase.execute({
    resetLink: "validResetLink",
    password: "newPassword",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.resetLinkHasNotBeenFoundCalled, false);
  assertEquals(presenter.resetLinkHasBeenExpiredCalled, false);
  assertEquals(presenter.resetLinkHasBeenUsedCalled, false);
  assertEquals(presenter.passwordHasBeenResetCalled, true);
});
