import {
  assert,
  assertEquals,
  assertNotEquals,
  assertMatch,
} from "https://deno.land/std/testing/asserts.ts";
import SendOtpToPhoneNumberUseCase from "../../../core/usecase/send-otp-to-phone-number.ts";
import BehinOtp from "../../../adapter/otp-util/behin-otp-util.ts";
import FakeSmsSender from "../../../adapter/sms-sender/fake-sms-sender.ts";
import InMemoryOtpRepo from "../../../adapter/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../../../adapter/otp-config/default-otp-config.ts";
import { ShaAlg } from "../../../core/entity/sha-alg.ts";
import InMemoryUserRepo from "../../../adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../../../adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../../../adapter/password-hasher/bcrypt.ts";
import CreateUserByPhoneNumberUseCase from "../../../core/usecase/create-user-by-phone-number.ts";
import EventEmitterImpl from "../../../adapter/event-emitter/class-event-emitter.ts";
import TestConfig from "../../../config/test-config.ts";

Deno.test("Send Otp to none existing User", async () => {
  let testConfig = new TestConfig();
  let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();

  try {
    let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501234567");
  } catch (e) {
    assertEquals(e.message, "user not registered");
  }
});

Deno.test("Send Otp to existing User", async () => {
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
  assertEquals(token.length, 4);
  assertMatch(token, /^[0-9]{4}$/);
});
