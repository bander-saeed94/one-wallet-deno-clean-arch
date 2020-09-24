import InviteContributorInput from "./UseCaseInput.ts";

export default interface InviteContributorInputPort {
  execute(input: InviteContributorInput): Promise<void>;
}
