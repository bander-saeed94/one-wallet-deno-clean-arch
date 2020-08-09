import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import CreateUserByPhoneNumberUseCase from "../../../core/usecase/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../../../core/adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../../../core/adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../../../core/adapter/password-hasher/bcrypt.ts";

Deno.test("Create User", async () => {
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
  assertEquals(user.phoneNumber, "966501766627");
  assertNotEquals(user.hashedPassword, "Aa123456");
  assertEquals(user.firstName, "Bander");
  assertEquals(user.lastName, "Alshammari");
  assertEquals(user.verifiedByPhoneNumber, false);
});

Deno.test("Reject Create User When Already Exist", async () => {
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

  try {
    let user = await createUserByPhoneNumberUseCase.createUser(
      "966501766627",
      "Aa123456",
      "Bander",
      "Alshammari",
    );
  } catch (e) {
    assertEquals(
      e.message,
      "user with phoneNumber: 966501766627 already exist",
    );
  }
});

Deno.test("Create User With Non Saudi Number", async () => {
  let userRepo = new InMemoryUserRepo();
  let uuidGenerator = new UUIDGenerator();
  let bcryptHasher = new BcryptHasher();
  let createUserByPhoneNumberUseCase = new CreateUserByPhoneNumberUseCase(
    userRepo,
    uuidGenerator,
    bcryptHasher,
  );
  try {
    let user = await createUserByPhoneNumberUseCase.createUser(
      "960501766627",
      "Aa123456",
      "Bander",
      "Alshammari",
    );
  } catch (e) {
    assertEquals(e.message, "phoneNumber: 960501766627 is not saudi number");
  }
});

Deno.test("Create User With less than 8 char password", async () => {
  let userRepo = new InMemoryUserRepo();
  let uuidGenerator = new UUIDGenerator();
  let bcryptHasher = new BcryptHasher();
  let createUserByPhoneNumberUseCase = new CreateUserByPhoneNumberUseCase(
    userRepo,
    uuidGenerator,
    bcryptHasher,
  );
  try {
    let user = await createUserByPhoneNumberUseCase.createUser(
      "966501766627",
      "Aa12345",
      "Bander",
      "Alshammari",
    );
  } catch (e) {
    assertEquals(e.message, "password length: 7 is less than accepted 8");
  }
});
