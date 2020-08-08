import {
  assert,
  assertEquals,
  assertNotEquals,
  assertMatch,
} from "https://deno.land/std/testing/asserts.ts";
import SendOtpToPhoneNumberUseCase from "../../../core/usecase/send-otp-to-phone-number.ts";
import BehinOtp from "../../../core/adapter/otp-util/behin-otp-util.ts";
import FakeSmsSender from "../../../core/adapter/sms-sender/fake-sms-sender.ts";
import InMemoryOtpRepo from "../../../core/adapter/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../../../core/adapter/otp-config/default-otp-config.ts";
import { ShaAlg } from "../../../core/entity/sha-alg.ts";
import InMemoryUserRepo from "../../../core/adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../../../core/adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../../../core/adapter/password-hasher/bcrypt.ts";
import CreateUserByPhoneNumberUseCase from "../../../core/usecase/create-user-by-phone-number.ts";

Deno.test("Send Otp to none existing User", async () => {
  let behin = new BehinOtp();
  let fakeSmsSender = new FakeSmsSender();
  let otpRepo = new InMemoryOtpRepo();
  let otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);
  let userRepo = new InMemoryUserRepo();

  let sendOtpToPhoneNumberUseCase = new SendOtpToPhoneNumberUseCase(
    behin,
    fakeSmsSender,
    otpRepo,
    otpConfig,
    userRepo,
  );
  try {
    let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501234567");
  } catch (e) {
    assertEquals(e.message, "user not registered");
  }
});

Deno.test("Send Otp to existing User", async () => {
  let userRepo = new InMemoryUserRepo();
  let uuidGenerator = new UUIDGenerator();
  let bcryptHasher = new BcryptHasher();
  let createUserByPhoneNumberUseCase = new CreateUserByPhoneNumberUseCase(
    userRepo,
    uuidGenerator,
    bcryptHasher,
  );
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  let behin = new BehinOtp();
  let fakeSmsSender = new FakeSmsSender();
  let otpRepo = new InMemoryOtpRepo();
  let otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

  let sendOtpToPhoneNumberUseCase = new SendOtpToPhoneNumberUseCase(
    behin,
    fakeSmsSender,
    otpRepo,
    otpConfig,
    userRepo,
  );
  let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");
  assertEquals(token.length, 4);
  assertMatch(token, /^[0-9]{4}$/);
});
