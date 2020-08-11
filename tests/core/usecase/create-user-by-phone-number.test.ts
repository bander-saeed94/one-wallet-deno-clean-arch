import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import TestConfig from "../../../config/test-config.ts";

Deno.test("Create User", async () => {
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
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
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
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
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();

  try {
    let user = await createUserByPhoneNumberUseCase.createUser(
      "960501766627",
      "Aa123456",
      "Bander",
      "Alshammari",
    );
  } catch (e) {
    assertEquals(
      e.message,
      "phoneNumber: 960501766627 is not a valid saudi number",
    );
  }
});

Deno.test("Create User With Invalid Phone Number", async () => {
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
  try {
    let user = await createUserByPhoneNumberUseCase.createUser(
      "96050176662",
      "Aa123456",
      "Bander",
      "Alshammari",
    );
  } catch (e) {
    assertEquals(
      e.message,
      "phoneNumber: 96050176662 is not a valid saudi number",
    );
  }
});

Deno.test("Create User With less than 8 char password", async () => {
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
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
