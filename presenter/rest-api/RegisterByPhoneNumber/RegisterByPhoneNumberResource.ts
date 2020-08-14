import RegisterUserByPhoneNumberInput from "../../../core/usecases/RegisterUserByPhoneNumber/RegisterUserByPhoneNumberInput.ts";
import UserResponse from "../entities/UserResponse.ts";
import BadRequestResponse from "../entities/BadRequestResponse.ts";

export default interface RegisterByPhoneNumberResource {
  register(
    input: RegisterUserByPhoneNumberInput,
  ): Promise<UserResponse | BadRequestResponse>;
}
