import {
  assert,
  assertEquals,
  assertNotEquals,
  assertMatch,
} from "https://deno.land/std/testing/asserts.ts";
import TestConfig from "../../../config/test-config.ts";

Deno.test("Verify user", async () => {
  //given user and otp sent
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();

  let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");

  //when verifying otp
  let userBeforeVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assert(!userBeforeVerification?.verifiedByPhoneNumber);
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase();
  verifyUserByPhoneNumberUseCase.verify("966501766627", token);
  //then user is verified
  let userAfterVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assert(userAfterVerification?.verifiedByPhoneNumber);
});

Deno.test("Given otp generated twice, then first should be invalid to activate with", async () => {
  //given user and otp sent
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();

  let firstToken: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");
  let secondToken: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");

  //when verifying otp
  let userBeforeVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assert(!userBeforeVerification?.verifiedByPhoneNumber);
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase();
  verifyUserByPhoneNumberUseCase.verify("966501766627", firstToken);
  //then user is verified
  let userAfterVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assertEquals(userAfterVerification?.verifiedByPhoneNumber, false);
});

Deno.test("Given otp generated twice, then second should be valid to activate with", async () => {
  //given user and otp sent
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();

  let firstToken: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");
  let secondToken: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");

  //when verifying otp
  let userBeforeVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assert(!userBeforeVerification?.verifiedByPhoneNumber);
  let verifyUserByPhoneNumberUseCase = testConfig
    .verifyUserByPhoneNumberUseCase();
  verifyUserByPhoneNumberUseCase.verify("966501766627", secondToken);
  //then user is verified
  let userAfterVerification = testConfig.userRepo.findByPhoneNumber(
    "966501766627",
  );
  assertEquals(userAfterVerification?.verifiedByPhoneNumber, true);
});
