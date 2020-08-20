import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import TestConfig from "../../../../../config/test-config.ts";
import { SendOtpToPhoneNumberInput } from "../../../../../src/UseCases/SendOtpToPhoneNumber/mod.ts";
import SendOtpToPhoneNumberPresenterFake from "../../presenters/SendOtpToPhoneNumberPresenterFake.ts";
import RegisterByPhoneNumberPresenterFake from "../../presenters/RegisterByPhoneNumberPresenterFake.ts";

Deno.test("Send Otp To None Registered User", async () => {
  let testConfig = new TestConfig();
  let presenter = new SendOtpToPhoneNumberPresenterFake();
  let input: SendOtpToPhoneNumberInput = {
    phoneNumber: "966501766627",
  };
  let sendOtpToPhoneNumberUseCase = testConfig
    .sendOtpToPhoneNumberUseCase(presenter);
  await sendOtpToPhoneNumberUseCase.execute(
    input,
  );
  let otpSentCalled = presenter.otpSentCalled;
  let userIsAlreadyVerifiedCalled = presenter.userIsAlreadyVerifiedCalled;
  let userIsNotRegisteredCalled = presenter.userIsNotRegisteredCalled;
  assertEquals(otpSentCalled, false);
  assertEquals(userIsAlreadyVerifiedCalled, false);
  assertEquals(userIsNotRegisteredCalled, true);
});

Deno.test("Send Otp to Non Verified User", async () => {
  let testConfig = new TestConfig();

  //given user is registered
  let registerUserByPhoneNumberUseCase = testConfig
    .registerUserByPhoneNumberUseCase(new RegisterByPhoneNumberPresenterFake());
  await registerUserByPhoneNumberUseCase.execute(
    {
      phoneNumber: "966501766627",
      password: "Aa123456",
      firstName: "Bander",
      lastName: "Alshammari",
    },
  );
  //when
  let presenter = new SendOtpToPhoneNumberPresenterFake();
  let input: SendOtpToPhoneNumberInput = {
    phoneNumber: "966501766627",
  };
  let sendOtpToPhoneNumberUseCase = testConfig
    .sendOtpToPhoneNumberUseCase(presenter);
  await sendOtpToPhoneNumberUseCase.execute(
    input,
  );
  let otpSentCalled = presenter.otpSentCalled;
  let userIsAlreadyVerifiedCalled = presenter.userIsAlreadyVerifiedCalled;
  let userIsNotRegisteredCalled = presenter.userIsNotRegisteredCalled;

  //then
  assertEquals(otpSentCalled, true);
  assertEquals(userIsAlreadyVerifiedCalled, false);
  assertEquals(userIsNotRegisteredCalled, false);
});

Deno.test("Send Otp to Verified User", async () => {
  //todo
});
