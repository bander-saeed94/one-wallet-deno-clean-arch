import type { Group } from "https://deno.land/x/abc@v1.0.3/mod.ts";
import { Context } from 'https://deno.land/x/abc@v1.0.3/mod.ts';
import RegisterUserByPhoneNumberRequest from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberRequest.ts";
import RestConfig from "../../../../../config/rest-config.ts";
import RegisterUserByPhoneNumberController from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberController.ts";
import { Status } from "https://deno.land/std@0.65.0/http/http_status.ts";
export default class UserRoutes {
  constructor(
    private readonly restConfig: RestConfig,
    private readonly g: Group,
  ) {
    this.g.post("", async (c: Context) => {
      //todo fix casting
      let registerUserByPhoneNumberRequest: RegisterUserByPhoneNumberRequest =
        await c.body() as RegisterUserByPhoneNumberRequest;
      let presenter = this.restConfig
        .registerUserByPhoneNumberPresenter();
      let registerUserByPhoneNumberUseCase = this.restConfig
        .registerUserByPhoneNumberInteractor(presenter);
      let registerUserByPhoneNumberController =
        new RegisterUserByPhoneNumberController(
          registerUserByPhoneNumberUseCase,
        );
      await registerUserByPhoneNumberController.registerUser(
        registerUserByPhoneNumberRequest,
      );
      //presenter
      c.json(presenter.present.body, presenter.present.httpStatus)
    });
  }
}
