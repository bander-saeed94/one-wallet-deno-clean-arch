import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { RegisterUserByPhoneNumberInput } from "../../../../src/UseCases/RegisterUserByPhoneNumber/mod.ts";
import RegisterByPhoneNumberPresenterFake from "../../presenters/RegisterByPhoneNumberPresenterFake.ts";
import UnitTestConfig from "../../../../config/UnitTestConfig.ts";

Deno.test("Create User", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "966501766626",
    password: "Aa123456",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  let user = presenter.createdUser!;
  assertEquals(user.phoneNumber, "966501766626");
  assertNotEquals(user.hashedPassword, "Aa123456");
  assertEquals(user.firstName, "Bander");
  assertEquals(user.lastName, "Alshammari");
  assertEquals(user.verifiedByPhoneNumber, false);
  assertEquals(typeof presenter.existingUser, "undefined");
  assertEquals(presenter.invalidFields.length, 0);
});

Deno.test("Reject Create User When Already Exist", async () => {
  //given
  let unitTestConfig = new UnitTestConfig();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "966501766627",
    password: "Aa123456",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  //when
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  let existingUser = presenter.existingUser!;
  //then
  assertEquals(existingUser.phoneNumber, "966501766627");
  assertNotEquals(existingUser.hashedPassword, "Aa123456");
  assertEquals(existingUser.firstName, "Bander");
  assertEquals(existingUser.lastName, "Alshammari");
  assertEquals(existingUser.verifiedByPhoneNumber, false);
  assertEquals(typeof presenter.createdUser, "undefined");
  assertEquals(presenter.invalidFields.length, 0);
});

Deno.test("Create User With Non Saudi Number", async () => {
  //given
  let unitTestConfig = new UnitTestConfig();
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "960501766627",
    password: "Aa123456",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  //when
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  //then
  assertEquals(presenter.invalidFields[0].name, "phoneNumber");
  assertEquals(presenter.invalidFields[0].reason, "invalidSaudiNumber");
  assertEquals(typeof presenter.existingUser, "undefined");
  assertEquals(typeof presenter.createdUser, "undefined");
});

Deno.test("Create User With Invalid Phone Number", async () => {
  //given
  let unitTestConfig = new UnitTestConfig();
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "96050176662",
    password: "Aa123456",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  //when
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  //then
  assertEquals(presenter.invalidFields[0].name, "phoneNumber");
  assertEquals(presenter.invalidFields[0].reason, "invalidSaudiNumber");
  assertEquals(typeof presenter.existingUser, "undefined");
  assertEquals(typeof presenter.createdUser, "undefined");
});

Deno.test("Create User With less than 8 char password", async () => {
  //given
  let unitTestConfig = new UnitTestConfig();
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "966501766627",
    password: "Aa12345",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  //when
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  //then
  assertEquals(presenter.invalidFields[0].name, "password");
  assertEquals(presenter.invalidFields[0].reason, "shortPassword");
  assertEquals(typeof presenter.existingUser, "undefined");
  assertEquals(typeof presenter.createdUser, "undefined");
});

Deno.test("Invalid phone number and password", async () => {
  //given
  let unitTestConfig = new UnitTestConfig();
  let presenter = new RegisterByPhoneNumberPresenterFake();
  let input: RegisterUserByPhoneNumberInput = {
    phoneNumber: "96650176662",
    password: "Aa12345",
    firstName: "Bander",
    lastName: "Alshammari",
  };
  let registerUserByPhoneNumberUseCase = unitTestConfig
    .registerUserByPhoneNumberUseCase(presenter);
  //when
  await registerUserByPhoneNumberUseCase.execute(
    input,
  );
  //then
  assertEquals(presenter.invalidFields[0].name, "phoneNumber");
  assertEquals(presenter.invalidFields[0].reason, "invalidSaudiNumber");
  assertEquals(presenter.invalidFields[1].name, "password");
  assertEquals(presenter.invalidFields[1].reason, "shortPassword");
  assertEquals(typeof presenter.existingUser, "undefined");
  assertEquals(typeof presenter.createdUser, "undefined");
});
