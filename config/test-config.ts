import CreateUserByPhoneNumberUseCase from "../src/UseCases/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../src/Adapters/gateways/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../src/Adapters/lib/id-generator/uuid-generator.ts";
import BcryptHasher from "../src/Adapters/lib/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../src/Adapters/event-emitter/class-event-emitter.ts";
import ListenerOnUserCreatedEvent from "../src/UseCases/EventsReaction/ListenerOnUserCreatedEvent.ts";
import BehinOtp from '../src/Adapters/lib/otp-util/behin-otp-util.ts';
import SmsSenderImpl from "../src/Adapters/gateways/sms-sender/SmsSenderImpl.ts";
import InMemoryOtpRepo from "../src/Adapters/gateways/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../src/Adapters/lib/otp-config/default-otp-config.ts";
import { ShaAlg } from "../src/Entities/sha-alg.ts";
import LoginUserWithPhoneNumberUseCase from "../src/UseCases/login-user-with-phone-number.ts";

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

export default class TestConfig {
  readonly userRepo = new InMemoryUserRepo();
  private readonly uuidGenerator = new UUIDGenerator();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly eventEmitter = new EventEmitterImpl();

  private readonly behin = new BehinOtp();
  private readonly smsSenderImpl = new SmsSenderImpl();
  private readonly otpRepo = new InMemoryOtpRepo();
  private readonly otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

  //refactor
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
      this.behin,
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
      this.behin,
      this.otpRepo,
      this.userRepo,
      verifyUserByPhoneNumberOutputPort,
    );
  }

  //before refactor
  public createUserByPhoneNumberUseCase(): CreateUserByPhoneNumberUseCase {
    return new CreateUserByPhoneNumberUseCase(
      this.userRepo,
      this.uuidGenerator,
      this.bcryptHasher,
      this.eventEmitter,
    );
  }

  public eventListenerOnUserCreated(
    sendOtpToPhoneNumberInteractor: SendOtpToPhoneNumberInputPort,
  ): ListenerOnUserCreatedEvent {
    return new ListenerOnUserCreatedEvent(
      this.eventEmitter,
      sendOtpToPhoneNumberInteractor,
    );
  }

  // public verifyUserByPhoneNumberUseCase(): VerifyUserByPhoneNumberUseCase {
  //   return new VerifyUserByPhoneNumberUseCase(
  //     this.behin,
  //     this.otpRepo,
  //     this.userRepo,
  //   );
  // }

  public loginUserWithPhoneNumberUseCase(): LoginUserWithPhoneNumberUseCase {
    return new LoginUserWithPhoneNumberUseCase(
      this.bcryptHasher,
      this.userRepo,
    );
  }
}
