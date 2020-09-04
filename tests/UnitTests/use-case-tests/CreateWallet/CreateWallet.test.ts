import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std/testing/asserts.ts";

import UnitTestConfig from "../../../../config/UnitTestConfig.ts";
import CreateWalletPresenterFake from "../../presenters/CreateWalletPresenterFake.ts";

Deno.test("Create Wallet, No Logged In User", async () => {
  let unitTestConfig = new UnitTestConfig();
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter);
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
  let unitTestConfig = new UnitTestConfig();
  unitTestConfig.userAuthintcationImplFake.setCurrentUserValueNonVerifedByPhoneNumber();
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter);
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

Deno.test("Create Wallet", async () => {
  let unitTestConfig = new UnitTestConfig();
  unitTestConfig.userAuthintcationImplFake.setCurrentUserValue();
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter);
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
  let unitTestConfig = new UnitTestConfig();
  unitTestConfig.userAuthintcationImplFake.setCurrentUserValue();
  let presenter = new CreateWalletPresenterFake();
  let createWalletUseCase = unitTestConfig
    .createWalletUseCase(presenter);
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
