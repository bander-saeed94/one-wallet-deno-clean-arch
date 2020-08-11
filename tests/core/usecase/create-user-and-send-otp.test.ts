import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import TestConfig from "../../../config/test-config.ts";

Deno.test("Create User, Emit event, send otp", async () => {
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();

  let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();
  let eventListenerOnUserCreated = testConfig.eventListenerOnUserCreated(
    sendOtpToPhoneNumberUseCase,
  );
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );

  assertEquals(eventListenerOnUserCreated.getNumberOfEvents(), 1);
});
