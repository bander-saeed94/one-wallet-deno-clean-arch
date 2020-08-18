import type { Group } from "https://deno.land/x/abc@v1.0.3/mod.ts";
import { Context } from "https://deno.land/x/abc@v1.0.3/mod.ts";
import RegisterUserByPhoneNumberRequest from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberRequest.ts";
import RegisterUserByPhoneNumberController from "../../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberController.ts";
import AbcConfig from "../Config.ts";
export default class UserRoutes {
  constructor(
    private readonly abcConfig: AbcConfig,
    private readonly g: Group,
  ) {
    this.g.post("", async (c: Context) => {
      //todo fix casting
      let registerUserByPhoneNumberRequest: RegisterUserByPhoneNumberRequest =
        await c.body() as RegisterUserByPhoneNumberRequest;
      let presenter = this.abcConfig
        .registerUserByPhoneNumberPresenter();
      let registerUserByPhoneNumberController = this.abcConfig
        .registerUserByPhoneNumberController(presenter);
      await registerUserByPhoneNumberController.registerUser(
        registerUserByPhoneNumberRequest,
      );
      //presenter
      c.json(presenter.present.body, presenter.present.httpStatus);
    });
  }
}
