import User from "../../../core/entity/user.ts";

export default class BadRequestResponse {
  constructor(
    public readonly message: string,
  ) {
  }
}
