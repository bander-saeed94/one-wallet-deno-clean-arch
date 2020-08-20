import { Router } from "https://deno.land/x/oak/mod.ts";
import RegisterUserByPhoneNumberRequest from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberRequest.ts";
import OakConfig from "../Config.ts";
import RestPresentation from "../../../../Adapters/presenters/rest-api/RestPresentation.ts";

export default class UserRoutes {
  public readonly router = new Router({
    prefix: "/api/v1/users",
  });

  constructor(
    private readonly oakConfig: OakConfig,
  ) {
    this.router
      .get(`/`, (c) => {
        c.response.body = "some Users";
      })
      .post("/", async (c) => {
        const requestBody: RegisterUserByPhoneNumberRequest = await c.request
          .body().value;

        let presenter = this.oakConfig.registerUserByPhoneNumberPresenter();
        let registerUserByPhoneNumberController = this.oakConfig
          .registerUserByPhoneNumberController(presenter);
        await registerUserByPhoneNumberController.registerUser(
          requestBody,
        );
        let resp = presenter.present();
        c.response.body = resp.body;
        c.response.status = resp.httpStatus;
      });
  }
}
