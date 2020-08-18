import RestConfig from "../../../../config/rest-config.ts";
import RegisterUserByPhoneNumberController from "../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberController.ts";
import RegisterUserByPhoneNumberPresenter from "../../../Adapters/presenters/rest-api/RegisterUserByPhoneNumberPresenter.ts";

export default class OakConfig {
  private readonly restConfig = new RestConfig();

  public registerUserByPhoneNumberController(
    presenter: RegisterUserByPhoneNumberPresenter,
  ): RegisterUserByPhoneNumberController {
    return new RegisterUserByPhoneNumberController(
      this.restConfig
        .registerUserByPhoneNumberInteractor(presenter),
    );
  }

  public registerUserByPhoneNumberPresenter(): RegisterUserByPhoneNumberPresenter {
    return new RegisterUserByPhoneNumberPresenter();
  }
}
