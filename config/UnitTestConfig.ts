import UUIDGenerator from "../src/Adapters/lib/id-generator/uuid-generator.ts";
import BcryptHasher from "../src/Adapters/lib/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../src/Adapters/event-emitter/class-event-emitter.ts";
import SmsSenderImpl from "../src/Adapters/gateways/sms-sender/SmsSenderImpl.ts";
import OtpConfigImpl from "../src/Adapters/lib/otp-config/default-otp-config.ts";
import { ShaAlg } from "../src/Entities/sha-alg.ts";
import InMemoryUserRepoFake from "../tests/core/UnitTests/gateways/repo/UserRepoFake.ts";
import InMemoryOtpRepoFake from "../tests/core/UnitTests/gateways/repo/OtpRepoFake.ts";
import OtpUtilFake from "../tests/core/UnitTests/lib/otp-util/OtpUtilFake.ts";

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

export default class UnitTestConfig {
  readonly userRepo = new InMemoryUserRepoFake();
  private readonly otpRepo = new InMemoryOtpRepoFake();

  private readonly uuidGenerator = new UUIDGenerator();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly eventEmitter = new EventEmitterImpl();

  private readonly otpUtilFake = new OtpUtilFake();

  private readonly smsSenderImpl = new SmsSenderImpl();
  private readonly otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

  public registerUserByPhoneNumberUseCase(
    registerByPhoneNumberPresenter: RegisterUserByPhoneNumberOutputPort,
  ): RegisterUserByPhoneNumberInputPort {
    return new RegisterUserByPhoneNumberInteractor(
      this.userRepo,
      this.uuidGenerator,
      this.bcryptHasher,
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
}
