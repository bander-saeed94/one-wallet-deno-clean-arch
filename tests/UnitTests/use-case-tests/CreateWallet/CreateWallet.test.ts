import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import UnitTestConfig from "../../../../config/UnitTestConfig.ts";
import CreateWalletPresenterFake from "../../presenters/CreateWalletPresenterFake.ts";

Deno.test("Create Wallet, No Logged In User", async () => {
  const unitTestConfig = new UnitTestConfig();
  const userAuthintcationImpl = unitTestConfig.userAuthintcationImplFake();
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter, userAuthintcationImpl);
  await createWalletUseCase.execute({
    walletName: "family wallet",
    iban: "SA03 8000 0000 6080 1016 7519",
  });
  assertEquals(presenter.noLoggedInUserCalled, true);
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(typeof presenter.wallet, "undefined");
  assertEquals(presenter.walletHasBeenCreatedCalled, false);
  assertEquals(presenter.userNotVerifedByPhoneNumberCalled, false);
});

Deno.test("Create Wallet Given logged in user is not verified", async () => {
  const unitTestConfig = new UnitTestConfig();
  const userAuthintcationImpl = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcationImpl.login("966501766627", "hashedAa123456"); //966501766627 non verified user, check userRepoFake
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter, userAuthintcationImpl);
  await createWalletUseCase.execute({
    walletName: "isterah wallet",
    iban: "SA03 8000 0000 6080 1016 751",
  });
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.invalidFields.length, 0);
  assertEquals(typeof presenter.wallet, "undefined");
  assertEquals(presenter.walletHasBeenCreatedCalled, false);
  assertEquals(presenter.userNotVerifedByPhoneNumberCalled, true);
});

Deno.test("Create Wallet, walletHasBeenCreatedCalled", async () => {
  const unitTestConfig = new UnitTestConfig();
  const userAuthintcationImpl = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcationImpl.login("966501766628", "hashedAa123456"); //966501766628 verified user, check userRepoFake

  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter, userAuthintcationImpl);
  await createWalletUseCase.execute({
    walletName: "family wallet",
    iban: "SA03 8000 0000 6080 1016 7519",
  });
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.invalidFields.length, 0);
  assertNotEquals(typeof presenter.wallet, "undefined");
  assertEquals(presenter.walletHasBeenCreatedCalled, true);
  assertEquals(presenter.userNotVerifedByPhoneNumberCalled, false);
});

Deno.test("Create Wallet Invalid fields", async () => {
  const unitTestConfig = new UnitTestConfig();
  const userAuthintcationImpl = unitTestConfig.userAuthintcationImplFake();
  await userAuthintcationImpl.login("966501766628", "hashedAa123456"); //966501766628 verified user, check userRepoFake

  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter, userAuthintcationImpl);
  await createWalletUseCase.execute({
    walletName: "isterah wallet",
    iban: "SA03 8000 0000 6080 1016 751",
  });
  assertEquals(presenter.noLoggedInUserCalled, false);
  assertEquals(presenter.invalidFields.length, 1);
  assertEquals(typeof presenter.wallet, "undefined");
  assertEquals(presenter.walletHasBeenCreatedCalled, false);
  assertEquals(presenter.userNotVerifedByPhoneNumberCalled, false);
});
