import InMemoryUserRepo from "../src/Adapters/gateways/repo/in-memory/in-memory-user-repo.ts";
import UUIDGenerator from "../src/Adapters/lib/id-generator/uuid-generator.ts";
import BcryptHasher from "../src/Adapters/lib/password-hasher/bcrypt.ts";
import EventEmitterImpl from "../src/Adapters/event-emitter/class-event-emitter.ts";
import RegisterUserByPhoneNumberPresenter from "../src/Adapters/presenters/rest-api/RegisterUserByPhoneNumberPresenter.ts";

import {
  RegisterUserByPhoneNumberInputPort,
  RegisterUserByPhoneNumberInteractor,
  RegisterUserByPhoneNumberOutputPort,
} from "../src/UseCases/RegisterUserByPhoneNumber/mod.ts";

export default class RestConfig {
  readonly userRepo = new InMemoryUserRepo();
  private readonly uuidGenerator = new UUIDGenerator();
  private readonly bcryptHasher = new BcryptHasher();
  private readonly eventEmitter = new EventEmitterImpl();

  public registerUserByPhoneNumberInteractor(
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

  public registerUserByPhoneNumberPresenter(): RegisterUserByPhoneNumberPresenter {
    return new RegisterUserByPhoneNumberPresenter();
  }
}
