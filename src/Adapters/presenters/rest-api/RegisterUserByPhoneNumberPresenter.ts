import { RegisterUserByPhoneNumberOutputPort } from "../../../UseCases/RegisterUserByPhoneNumber/mod.ts";
import InvalidField from "../../../UseCases/InvalidField.ts";
import User from "../../../Entities/user.ts";
import RestPresentation from "./RestPresentation.ts";
import RegisterUserByPhoneNumberResponse from "./RegisterUserByPhoneNumberResponse.ts";
import { resolve } from "https://deno.land/std@0.62.0/path/win32.ts";
export default class RegisterUserByPhoneNumberPresenter
  implements RegisterUserByPhoneNumberOutputPort {
  private restPresentation: RestPresentation = {
    body: "default resp",
    httpStatus: 500,
  };

  constructor() {
  }

  public async present(): Promise<RestPresentation> {
    return this.restPresentation;
  }

  async invalidInputs(fields: InvalidField[]): Promise<void> {
    console.log(`InvalidField: ${JSON.stringify(fields)}`);
    this.restPresentation = {
      httpStatus: 400,
      body: fields,
    };
  }

  async userAlreadyExist(existingUser: User): Promise<void> {
    console.log("user already exist");
    this.restPresentation = {
      httpStatus: 409,
      body: "",
    };
  }

  async Ok(createdUser: User): Promise<void> {
    console.log("user created");
    this.restPresentation = {
      httpStatus: 201,
      body: RegisterUserByPhoneNumberResponse.from(createdUser),
    };
  }
}
