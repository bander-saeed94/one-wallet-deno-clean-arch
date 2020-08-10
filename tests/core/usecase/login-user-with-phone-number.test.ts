import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import CreateUserByPhoneNumberUseCase from "../../../core/usecase/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../../../adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../../../adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../../../adapter/password-hasher/bcrypt.ts";
import LoginUserWithPhoneNumberUseCase from "../../../core/usecase/login-user-with-phone-number.ts";
import EventEmitterImpl from "../../../adapter/event-emitter/class-event-emitter.ts";

Deno.test("Login User", async () => {
  //given
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
  let createdUser = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  //when
  const loginUserWithPhoneNumberUseCase = new LoginUserWithPhoneNumberUseCase(
    bcryptHasher,
    userRepo,
  );
  let loggedInUser = await loginUserWithPhoneNumberUseCase.login(
    "966501766627",
    "Aa123456",
  );

  //then
  assertEquals(createdUser.phoneNumber, loggedInUser.phoneNumber);
  assertEquals(createdUser.hashedPassword, loggedInUser.hashedPassword);
  assertEquals(createdUser.firstName, loggedInUser.firstName);
  assertEquals(createdUser.lastName, loggedInUser.lastName);
});
