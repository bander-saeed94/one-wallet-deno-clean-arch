import UUIDGenerator from "../src/Adapters/lib/id-generator/uuid-generator.ts";
import EventEmitterImpl from "../src/Adapters/event-emitter/class-event-emitter.ts";
import SmsSenderImpl from "../src/Adapters/gateways/sms-sender/SmsSenderImpl.ts";
import OtpConfigImpl from "../src/Adapters/lib/otp-config/default-otp-config.ts";
import { ShaAlg } from "../src/Entities/sha-alg.ts";
import InMemoryUserRepoFake from "../tests/UnitTests/gateways/repo/UserRepoFake.ts";
import InMemoryOtpRepoFake from "../tests/UnitTests/gateways/repo/OtpRepoFake.ts";
import OtpUtilFake from "../tests/UnitTests/lib/otp-util/OtpUtilFake.ts";
import PassowrdHasherFake from "../tests/UnitTests/lib/otp-util/PasswordHasherFake.ts";
import InMemoryResetPasswordRepoFake from "../tests/UnitTests/gateways/repo/ResetPasswordRepoFake.ts";

import {
  RegisterUserByPhoneNumberInputPort,
  RegisterUserByPhoneNumberInteractor,
  RegisterUserByPhoneNumberOutputPort,
} from "../src/UseCases/RegisterUserByPhoneNumber/mod.ts";
import {
  SendOtpToPhoneNumberInputPort,
  SendOtpToPhoneNumberInteractor,
  SendOtpToPhoneNumberOutputPort,
} from "../src/UseCases/SendOtpToPhoneNumber/mod.ts";
import {
  VerifyUserByPhoneNumberInputPort,
  VerifyUserByPhoneNumberInteractor,
  VerifyUserByPhoneNumberOutputPort,
} from "../src/UseCases/VerifyUserByPhoneNumber/mod.ts";
import {
  LoginUserWithPhoneNumberInputPort,
  LoginUserWithPhoneNumberInteractor,
  LoginUserWithPhoneNumberOutputPort,
} from "../src/UseCases/LoginUserWithPhoneNumber/mod.ts";
import {
  ForgetPasswordInputPort,
  ForgetPasswordInteractor,
  ForgetPasswordOutputPort,
} from "../src/UseCases/ForgetPassword/mod.ts";
import {
  ResetPasswordInputPort,
  ResetPasswordInteractor,
  ResetPasswordOutputPort,
} from "../src/UseCases/ResetPassword/mod.ts";
import {
  CreateWalletInputPort,
  CreateWalletInteractor,
  CreateWalletOutputPort,
} from "../src/UseCases/CreateWallet/mod.ts";
import UserAuthintcationImplFake from "../tests/UnitTests/gateways/auth/UserAuthintcationImplFake.ts";
import InMemoryWalletRepoFake from "../tests/UnitTests/gateways/repo/WalletRepoFake.ts";

export default class UnitTestConfig {
  readonly userRepo = new InMemoryUserRepoFake();
  private readonly otpRepo = new InMemoryOtpRepoFake();
  private readonly resetPasswordRepo = new InMemoryResetPasswordRepoFake();
  private readonly walletRepo = new InMemoryWalletRepoFake();

  private readonly uuidGenerator = new UUIDGenerator();
  private readonly passwordHasherFake = new PassowrdHasherFake();
  private readonly eventEmitter = new EventEmitterImpl();

  private readonly otpUtilFake = new OtpUtilFake();

  private readonly smsSenderImpl = new SmsSenderImpl();
  private readonly otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

  public readonly userAuthintcationImplFake = new UserAuthintcationImplFake();

  public registerUserByPhoneNumberUseCase(
    registerByPhoneNumberPresenter: RegisterUserByPhoneNumberOutputPort,
  ): RegisterUserByPhoneNumberInputPort {
    return new RegisterUserByPhoneNumberInteractor(
      this.userRepo,
      this.uuidGenerator,
      this.passwordHasherFake,
      this.eventEmitter,
      registerByPhoneNumberPresenter,
    );
  }

  public sendOtpToPhoneNumberUseCase(
    sendOtpToPhoneNumberPresenter: SendOtpToPhoneNumberOutputPort,
  ): SendOtpToPhoneNumberInputPort {
    return new SendOtpToPhoneNumberInteractor(
      this.otpUtilFake,
      this.smsSenderImpl,
      this.otpRepo,
      this.otpConfig,
      this.userRepo,
      this.eventEmitter,
      sendOtpToPhoneNumberPresenter,
    );
  }
  public verifyUserByPhoneNumberUseCase(
    verifyUserByPhoneNumberOutputPort: VerifyUserByPhoneNumberOutputPort,
  ): VerifyUserByPhoneNumberInputPort {
    return new VerifyUserByPhoneNumberInteractor(
      this.otpUtilFake,
      this.otpRepo,
      this.userRepo,
      verifyUserByPhoneNumberOutputPort,
    );
  }
  public loginUserWithPhoneNumberUseCase(
    loginUserWithPhoneNumberOutputPort: LoginUserWithPhoneNumberOutputPort,
  ): LoginUserWithPhoneNumberInputPort {
    return new LoginUserWithPhoneNumberInteractor(
      this.passwordHasherFake,
      this.userRepo,
      loginUserWithPhoneNumberOutputPort,
    );
  }

  public forgetPasswordUseCase(
    forgetPasswordOutputPort: ForgetPasswordOutputPort,
  ): ForgetPasswordInputPort {
    return new ForgetPasswordInteractor(
      this.resetPasswordRepo,
      this.userRepo,
      this.uuidGenerator,
      this.smsSenderImpl,
      forgetPasswordOutputPort,
    );
  }

  public resetPasswordUseCase(
    resetPasswordOutputPort: ResetPasswordOutputPort,
  ): ResetPasswordInputPort {
    return new ResetPasswordInteractor(
      this.resetPasswordRepo,
      this.userRepo,
      this.passwordHasherFake,
      resetPasswordOutputPort,
    );
  }

  public createWalletUseCase(
    createWalletOutputPort: CreateWalletOutputPort,
  ): CreateWalletInputPort {
    return new CreateWalletInteractor(
      this.uuidGenerator,
      this.walletRepo,
      this.userAuthintcationImplFake,
      createWalletOutputPort,
    );
  }
}
