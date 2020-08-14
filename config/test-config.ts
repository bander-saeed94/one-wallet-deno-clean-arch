import CreateUserByPhoneNumberUseCase from "../core/usecases/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../adapter/gateways/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../adapter/lib/id-generator/uuid-generator.ts";
import BcryptHasher from "../adapter/lib/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../adapter/event-emitter/class-event-emitter.ts";
import SendOtpToPhoneNumberUseCase from "../core/usecases/send-otp-to-phone-number.ts";
import EventListenerOnUserCreated from "../core/events-listener/event-listener-on-user-created.ts";
import BehinOtp from "../adapter/lib/otp-util/behin-otp-util.ts";
import FakeSmsSender from "../adapter/gateways/sms-sender/fake-sms-sender.ts";
import InMemoryOtpRepo from "../adapter/gateways/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../adapter/lib/otp-config/default-otp-config.ts";
import { ShaAlg } from "../core/entity/sha-alg.ts";
import LoginUserWithPhoneNumberUseCase from "../core/usecases/login-user-with-phone-number.ts";
import VerifyUserByPhoneNumberUseCase from "../core/usecases/verify-user-by-phone-number.ts";

import {
  RegisterUserByPhoneNumberInputPort,
  RegisterUserByPhoneNumberInteractor,
  RegisterUserByPhoneNumberOutputPort,
} from "../core/usecases/RegisterUserByPhoneNumber/mod.ts";

export default class TestConfig {
  readonly userRepo = new InMemoryUserRepo();
  private readonly uuidGenerator = new UUIDGenerator();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly eventEmitter = new EventEmitterImpl();

  private readonly behin = new BehinOtp();
  private readonly fakeSmsSender = new FakeSmsSender();
  private readonly otpRepo = new InMemoryOtpRepo();
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

  public createUserByPhoneNumberUseCase(): CreateUserByPhoneNumberUseCase {
    return new CreateUserByPhoneNumberUseCase(
      this.userRepo,
      this.uuidGenerator,
      this.bcryptHasher,
      this.eventEmitter,
    );
  }
  public sendOtpToPhoneNumberUseCase(): SendOtpToPhoneNumberUseCase {
    return new SendOtpToPhoneNumberUseCase(
      this.behin,
      this.fakeSmsSender,
      this.otpRepo,
      this.otpConfig,
      this.userRepo,
    );
  }

  public eventListenerOnUserCreated(
    sendOtpToPhoneNumberUseCase: SendOtpToPhoneNumberUseCase,
  ): EventListenerOnUserCreated {
    return new EventListenerOnUserCreated(
      this.eventEmitter,
      sendOtpToPhoneNumberUseCase,
    );
  }

  public verifyUserByPhoneNumberUseCase(): VerifyUserByPhoneNumberUseCase {
    return new VerifyUserByPhoneNumberUseCase(
      this.behin,
      this.otpRepo,
      this.userRepo,
    );
  }

  public loginUserWithPhoneNumberUseCase(): LoginUserWithPhoneNumberUseCase {
    return new LoginUserWithPhoneNumberUseCase(
      this.bcryptHasher,
      this.userRepo,
    );
  }
}
