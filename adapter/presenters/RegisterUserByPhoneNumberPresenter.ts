import { RegisterUserByPhoneNumberOutputPort } from "../../core/usecases/RegisterUserByPhoneNumber/mod.ts";
import InvalidField from '../../core/usecases/InvalidField.ts';
import User from '../../core/entity/user.ts';

export default class RegisterUserByPhoneNumberPresenter implements RegisterUserByPhoneNumberOutputPort{
    invalidInputs(fields: InvalidField[]): void{

    }

    userAlreadyExist(existingUser: User): void{

    }
  
    Ok(createdUser: User): void{

    }
}
