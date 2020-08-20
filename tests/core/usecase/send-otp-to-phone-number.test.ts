// import {
//   assert,
//   assertEquals,
//   assertNotEquals,
//   assertMatch,
// } from "https://deno.land/std/testing/asserts.ts";
// import TestConfig from "../../../config/test-config.ts";

// Deno.test("Send Otp to none existing User", async () => {
//   let testConfig = new TestConfig();
//   let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();

//   try {
//     let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501234567");
//   } catch (e) {
//     assertEquals(e.message, "user not registered");
//   }
// });

// Deno.test("Send Otp to existing User", async () => {
//   let testConfig = new TestConfig();
//   let createUserByPhoneNumberUseCase = testConfig
//     .createUserByPhoneNumberUseCase();

//   let user = await createUserByPhoneNumberUseCase.createUser(
//     "966501766627",
//     "Aa123456",
//     "Bander",
//     "Alshammari",
//   );
//   let sendOtpToPhoneNumberUseCase = testConfig.sendOtpToPhoneNumberUseCase();
//   let token: string = sendOtpToPhoneNumberUseCase.sendOtp("966501766627");
//   assertEquals(token.length, 4);
//   assertMatch(token, /^[0-9]{4}$/);
// });
