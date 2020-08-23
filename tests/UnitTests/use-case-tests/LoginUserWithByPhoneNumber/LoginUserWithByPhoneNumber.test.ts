import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import LoginUserWithPhoneNumberPresenterFake from "../../presenters/LoginUserWithPhoneNumberPresenterFake.ts";
import UnitTestConfig from "../../../../config/UnitTestConfig.ts";

Deno.test("Given Non Existed User When Login User", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new LoginUserWithPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = unitTestConfig
    .loginUserWithPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766626",
    password: "12341234",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(typeof presenter.user, "undefined");
  assertEquals(presenter.userIsNotRegisteredCalled, true);
  assertEquals(presenter.userLoggedInCalled, false);
  assertEquals(presenter.unmatchedPasswordCalled, false);
});

Deno.test("Given Existed User When Login User With Incorrect Password", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new LoginUserWithPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = unitTestConfig
    .loginUserWithPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766627",
    password: "12341234",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(typeof presenter.user, "undefined");
  assertEquals(presenter.userIsNotRegisteredCalled, false);
  assertEquals(presenter.userLoggedInCalled, false);
  assertEquals(presenter.unmatchedPasswordCalled, true);
});

Deno.test("Given Existed User When Login User With Correct Password", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new LoginUserWithPhoneNumberPresenterFake();
  let verifyUserByPhoneNumberUseCase = unitTestConfig
    .loginUserWithPhoneNumberUseCase(presenter);
  await verifyUserByPhoneNumberUseCase.execute({
    phoneNumber: "966501766627",
    password: "Aa123456",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertNotEquals(typeof presenter.user, "undefined");
  assertEquals(presenter.userIsNotRegisteredCalled, false);
  assertEquals(presenter.userLoggedInCalled, true);
  assertEquals(presenter.unmatchedPasswordCalled, false);
});
