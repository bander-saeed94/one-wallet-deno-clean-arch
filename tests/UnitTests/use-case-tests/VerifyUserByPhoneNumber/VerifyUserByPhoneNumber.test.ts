import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import VerifyUserByPhoneNumberPresenterFake from "../../presenters/VerifyUserByPhoneNumberPresenterFake.ts";
import UnitTestConfig from "../../../../config/UnitTestConfig.ts";

Deno.test("Verify Non Registered User", async () => {
  let testConfig = new UnitTestConfig();
  let presenter = new VerifyUserByPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766626",
    enteredToken: "1234",
  });
  assertEquals(presenter.userIsNotRegisteredCalled, true);
  assertEquals(presenter.otpHasNotBeenGeneratedCalled, false);
  assertEquals(presenter.unmatchedTokenCalled, false);
  assertEquals(presenter.userHasBeenVerifiedCalled, false);
  assertEquals(presenter.invalidFields.length, 0);
});

Deno.test("Verify User, Token generated but unmatched", async () => {
  let testConfig = new UnitTestConfig();
  let presenter = new VerifyUserByPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766628",
    enteredToken: "1234",
  });
  assertEquals(presenter.userIsNotRegisteredCalled, false);
  assertEquals(presenter.otpHasNotBeenGeneratedCalled, false);
  assertEquals(presenter.unmatchedTokenCalled, true);
  assertEquals(presenter.userHasBeenVerifiedCalled, false);
  assertEquals(presenter.invalidFields.length, 0);
});

Deno.test("Verify User, Token generated and matched", async () => {
  let testConfig = new UnitTestConfig();
  let presenter = new VerifyUserByPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766628",
    enteredToken: "5678",
  });
  assertEquals(presenter.userIsNotRegisteredCalled, false);
  assertEquals(presenter.otpHasNotBeenGeneratedCalled, false);
  assertEquals(presenter.unmatchedTokenCalled, false);
  assertEquals(presenter.userHasBeenVerifiedCalled, true);
  assertEquals(presenter.invalidFields.length, 0);
});
