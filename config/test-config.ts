import CreateUserByPhoneNumberUseCase from "../core/usecase/create-user-by-phone-number.ts";
import InMemoryUserRepo from "../adapter/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../adapter/id-generator/uuid-generator.ts";
import BcryptHasher from "../adapter/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../adapter/event-emitter/class-event-emitter.ts";
import SendOtpToPhoneNumberUseCase from "../core/usecase/send-otp-to-phone-number.ts";
import EventListenerOnUserCreated from "../core/events-listener/event-listener-on-user-created.ts";
import BehinOtp from "../adapter/otp-util/behin-otp-util.ts";
import FakeSmsSender from "../adapter/sms-sender/fake-sms-sender.ts";
import InMemoryOtpRepo from "../adapter/repo/in-memory/in-memory-otp-repo.ts";
import OtpConfigImpl from "../adapter/otp-config/default-otp-config.ts";
import { ShaAlg } from "../core/entity/sha-alg.ts";
import LoginUserWithPhoneNumberUseCase from "../core/usecase/login-user-with-phone-number.ts";
import VerifyUserByPhoneNumberUseCase from "../core/usecase/verify-user-by-phone-number.ts";

export default class TestConfig {
  readonly userRepo = new InMemoryUserRepo();
  private readonly uuidGenerator = new UUIDGenerator();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly eventEmitter = new EventEmitterImpl();

  private readonly behin = new BehinOtp();
  private readonly fakeSmsSender = new FakeSmsSender();
  private readonly otpRepo = new InMemoryOtpRepo();
  private readonly otpConfig = new OtpConfigImpl(5, ShaAlg.sha1, 4);

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
