import { Router } from "https://deno.land/x/oak/mod.ts";
import RegisterUserByPhoneNumberRequest from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberRequest.ts";
import RestConfig from "../../../../../config/rest-config.ts";
import RegisterUserByPhoneNumberController from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberController.ts";

export default class UserRoutes {
  public readonly router = new Router({
    prefix: "/api/v1/users",
  });

  constructor(
    private readonly restConfig: RestConfig,
  ) {
    this.router
      .get(`/`, (c) => {
        c.response.body = "some Users";
      })
      .post("/", async (c) => {
        const requestBody: RegisterUserByPhoneNumberRequest = await c.request
          .body().value;

        (await c.request.body()).value;
        let presenter = this.restConfig
          .registerUserByPhoneNumberPresenter();
        let registerUserByPhoneNumberUseCase = this.restConfig
          .registerUserByPhoneNumberInteractor(presenter);
        let registerUserByPhoneNumberController =
          new RegisterUserByPhoneNumberController(
            registerUserByPhoneNumberUseCase,
          );
        await registerUserByPhoneNumberController.registerUser(
          requestBody,
        );
        //presenter
        c.response.body = presenter.present.body;
        c.response.status = presenter.present.httpStatus;
      });
  }
}
