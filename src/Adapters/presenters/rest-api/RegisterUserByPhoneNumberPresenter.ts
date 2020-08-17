import { RegisterUserByPhoneNumberOutputPort } from "../../../UseCases/RegisterUserByPhoneNumber/mod.ts";
import InvalidField from "../../../UseCases/InvalidField.ts";
import User from "../../../Entities/user.ts";
import RestPresentation from "./RestPresentation.ts";
import RegisterUserByPhoneNumberResponse from "./RegisterUserByPhoneNumberResponse.ts";

export default class RegisterUserByPhoneNumberPresenter
  implements RegisterUserByPhoneNumberOutputPort {
  private restPresentation: RestPresentation = {
    httpStatus: 500,
    body: "default resp",
  };

  public get present(): RestPresentation {
    return this.restPresentation;
  }

  invalidInputs(fields: InvalidField[]): void {
    console.log(`InvalidField: ${JSON.stringify(fields)}`);
    this.restPresentation = {
      httpStatus: 400,
      body: fields,
    };
  }

  userAlreadyExist(existingUser: User): void {
    console.log("user already exist");
    this.restPresentation = {
      httpStatus: 409,
      body: '',
    };
  }

  Ok(createdUser: User): void {
    console.log("user created");
    this.restPresentation = {
      httpStatus: 201,
      body: RegisterUserByPhoneNumberResponse.from(createdUser),
    };
  }
}
