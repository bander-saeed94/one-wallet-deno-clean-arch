import {
  ResetPasswordInput,
  ResetPasswordInputPort,
  ResetPasswordOutputPort,
} from "./mod.ts";

import InvalidField from "../InvalidField.ts";

export default class ResetPasswordInteractor implements ResetPasswordInputPort {
  constructor(
    private readonly outputPort: ResetPasswordOutputPort,
  ) {
  }

  async execute(input: ResetPasswordInput): Promise<void> {
    let invalidFields: InvalidField[] = [];

    const inputHasInvalidFields = invalidFields.length > 0;
    if (inputHasInvalidFields) {
      await this.outputPort.invalidInputs(invalidFields);
      return;
    }
    return;
  }
}
