import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { SendOtpToPhoneNumberInput } from "../../../../../src/UseCases/SendOtpToPhoneNumber/mod.ts";
import SendOtpToPhoneNumberPresenterFake from "../../presenters/SendOtpToPhoneNumberPresenterFake.ts";
import UnitTestConfig from "../../../../../config/UnitTestConfig.ts";

Deno.test("Send Otp To None Registered User", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new SendOtpToPhoneNumberPresenterFake();
  let input: SendOtpToPhoneNumberInput = {
    phoneNumber: "966501766626",
  };
  let sendOtpToPhoneNumberUseCase = unitTestConfig
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
  let unitTestConfig = new UnitTestConfig();

  //when
  let presenter = new SendOtpToPhoneNumberPresenterFake();
  let input: SendOtpToPhoneNumberInput = {
    phoneNumber: "966501766627",
  };
  let sendOtpToPhoneNumberUseCase = unitTestConfig
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
  let unitTestConfig = new UnitTestConfig();

  //when
  let presenter = new SendOtpToPhoneNumberPresenterFake();
  let input: SendOtpToPhoneNumberInput = {
    phoneNumber: "966501766628",
  };
  let sendOtpToPhoneNumberUseCase = unitTestConfig
    .sendOtpToPhoneNumberUseCase(presenter);
  await sendOtpToPhoneNumberUseCase.execute(
    input,
  );
  let otpSentCalled = presenter.otpSentCalled;
  let userIsAlreadyVerifiedCalled = presenter.userIsAlreadyVerifiedCalled;
  let userIsNotRegisteredCalled = presenter.userIsNotRegisteredCalled;

  //then
  assertEquals(otpSentCalled, false);
  assertEquals(userIsAlreadyVerifiedCalled, true);
  assertEquals(userIsNotRegisteredCalled, false);
});
