import { Application, Context } from "https://deno.land/x/abc@v1.0.2/mod.ts";
import RestConfig from "../../../../config/rest-config.ts";
import RegisterUserByPhoneNumberController from "../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberController.ts";
import RegisterUserByPhoneNumberRequest from "../../../Adapters/controllers/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberRequest.ts";

const app = new Application();

const webConfig = new RestConfig();

app
  .get("/hello", async (c: Context) => {
    console.log(await c.body());
    return "Hello, Abc!";
  })
  .post("/api/v1/users", async (c: Context) => {
    //todo fix casting
    let registerUserByPhoneNumberRequest: RegisterUserByPhoneNumberRequest =
      await c.body() as RegisterUserByPhoneNumberRequest;
    let presenter = webConfig
      .registerUserByPhoneNumberPresenter();
    let registerUserByPhoneNumberUseCase = webConfig
      .registerUserByPhoneNumberInteractor(presenter);
    let registerUserByPhoneNumberController =
      new RegisterUserByPhoneNumberController(registerUserByPhoneNumberUseCase);
    await registerUserByPhoneNumberController.registerUser(
      registerUserByPhoneNumberRequest,
    );
    //presenter
    return presenter.present;
  })
  .start({ port: 8081 });
