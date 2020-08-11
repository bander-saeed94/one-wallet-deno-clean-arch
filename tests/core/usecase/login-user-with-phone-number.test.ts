import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import TestConfig from "../../../config/test-config.ts";

Deno.test("Login User", async () => {
  //given
  let testConfig = new TestConfig();
  let createUserByPhoneNumberUseCase = testConfig
    .createUserByPhoneNumberUseCase();
  let createdUser = await createUserByPhoneNumberUseCase.createUser(
    "966501766627",
    "Aa123456",
    "Bander",
    "Alshammari",
  );
  //when
  const loginUserWithPhoneNumberUseCase = testConfig
    .loginUserWithPhoneNumberUseCase();
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
