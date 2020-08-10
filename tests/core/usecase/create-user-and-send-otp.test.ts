import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import CreateUserByPhoneNumberUseCase from "../../../core/usecase/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../../../core/adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../../../core/adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../../../core/adapter/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../../../core/adapter/event-emitter/class-event-emitter.ts";
import BehinOtp from "../../../core/adapter/otp-util/behin-otp-util.ts";
import FakeSmsSender from "../../../core/adapter/sms-sender/fake-sms-sender.ts";
import InMemoryOtpRepo from "../../../core/adapter/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../../../core/adapter/otp-config/default-otp-config.ts";
import { ShaAlg } from "../../../core/entity/sha-alg.ts";
import SendOtpToPhoneNumberUseCase from "../../../core/usecase/send-otp-to-phone-number.ts";
import EventListenerOnUserCreated from "../../../core/events-listener/event-listener-on-user-created.ts";

Deno.test("Create User, Emit event, send otp", async () => {
  let userRepo = new InMemoryUserRepo();
  let uuidGenerator = new UUIDGenerator();
  let bcryptHasher = new BcryptHasher();
  let eventEmitter = new EventEmitterImpl();
  let createUserByPhoneNumberUseCase = new CreateUserByPhoneNumberUseCase(
    userRepo,
    uuidGenerator,
    bcryptHasher,
    eventEmitter,
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
  let eventListenerOnUserCreated = new EventListenerOnUserCreated(
    eventEmitter,
    sendOtpToPhoneNumberUseCase,
  );
  let user = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  
});
