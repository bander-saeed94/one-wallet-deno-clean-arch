import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import ForgetPasswordPresenterFake from "../../presenters/ForgetPasswordPresenterFake.ts";
import UnitTestConfig from "../../../../config/UnitTestConfig.ts";

Deno.test("Given Non Existed User When Forget Password", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ForgetPasswordPresenterFake();
  let forgetPasswordUseCase = unitTestConfig
    .forgetPasswordUseCase(presenter);
  await forgetPasswordUseCase.execute({
    phoneNumber: "966501766626",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.userIsNotRegisteredCalled, true);
  assertEquals(presenter.esetPasswordLinkIsGeneratedCalled, false);
});

Deno.test("Given Existed User When Forget Password", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new ForgetPasswordPresenterFake();
  let forgetPasswordUseCase = unitTestConfig
    .forgetPasswordUseCase(presenter);
  await forgetPasswordUseCase.execute({
    phoneNumber: "966501766627",
  });
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(presenter.userIsNotRegisteredCalled, false);
  assertEquals(presenter.esetPasswordLinkIsGeneratedCalled, true);
});
