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
import VerifyUserByPhoneNumberUseCase from "../../../core/usecase/verify-user-by-phone-number.ts";

Deno.test("Verify user", async () => {
  //given user and otp sent
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
  let behinOtpUtil = new BehinOtp();
  let fakeSmsSender = new FakeSmsSender();
  let otpRepo = new InMemoryOtpRepo();
  let otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

  let sendOtpToPhoneNumberUseCase = new SendOtpToPhoneNumberUseCase(
    behinOtpUtil,
    fakeSmsSender,
    otpRepo,
    otpConfig,
    userRepo,
  );
  let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");

  //when verifying otp
  let userBeforeVerification = userRepo.findByPhoneNumber("966501766627");
  assert(!userBeforeVerification?.verifiedByPhoneNumber);
  let verifyUserByPhoneNumberUseCase = new VerifyUserByPhoneNumberUseCase(
    behinOtpUtil,
    otpRepo,
    userRepo,
  );
  verifyUserByPhoneNumberUseCase.verify("966501766627", token);
  //then user is verified
  let userAfterVerification = userRepo.findByPhoneNumber("966501766627");
  assert(userAfterVerification?.verifiedByPhoneNumber);
});
