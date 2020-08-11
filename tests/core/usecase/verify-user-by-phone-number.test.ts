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
import VerifyUserByPhoneNumberUseCase from "../../../core/usecase/verify-user-by-phone-number.ts";
import EventEmitterImpl from "../../../adapter/event-emitter/class-event-emitter.ts";
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
