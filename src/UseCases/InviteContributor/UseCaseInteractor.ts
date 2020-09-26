import {
  InviteContributorInput,
  InviteContributorInputPort,
  InviteContributorOutputPort,
} from "./mod.ts";

import IdGenerator from "../port/id-generator.ts";
import UserAuthintcation from "../port/UserAuthintcation.ts";
import WalletInvitationRepo from "../port/WalletInvitationRepo.ts";
import WalletRepo from "../port/WalletRepo.ts";
import UserRepo from "../port/UserRepo.ts";

import WalletInvitation from "../../Entities/WalletInvitation.ts";
import SmsSender from "../port/SmsSender.ts";
import { InvitationStatus } from "../../Entities/InvitationStatus.ts";
import User from "../../Entities/User.ts";

export default class InviteContributorInteractor
  implements InviteContributorInputPort {
  constructor(
    private readonly idGenerator: IdGenerator,
    private readonly walletInvitationRepo: WalletInvitationRepo,
    private readonly walletRepo: WalletRepo,
    private readonly userRepo: UserRepo,
    private readonly userAuthintcation: UserAuthintcation,
    private readonly smsSenderImpl: SmsSender,
    private readonly outputPort: InviteContributorOutputPort,
  ) {
  }

  async execute(input: InviteContributorInput): Promise<void> {
    const loggedInUser = await this.userAuthintcation.currentUser();

    const noLoggedInUser = typeof loggedInUser === "undefined";
    if (noLoggedInUser) {
      await this.outputPort.noLoggedInUser();
      return;
    }

    const userNotVerifedByPhoneNumber = !loggedInUser!.verifiedByPhoneNumber;
    if (userNotVerifedByPhoneNumber) {
      await this.outputPort.loggedInUserNotVerifedByPhoneNumber();
      return;
    }

    const wallet = await this.walletRepo.findByWalletId(input.walletId);
    const walletNotFound = typeof wallet === "undefined";
    if (walletNotFound) {
      await this.outputPort.walletNotFound();
      return;
    }

    if (wallet!.adminId !== loggedInUser!.id) {
      await this.outputPort.loggedInUserNotAdminOfTheWallet();
      return;
    }

    const invalidFields = [];

    const saudiNumber = /^9665[0-9]{8}$/;
    const invalidSaudiNumber = !saudiNumber.test(input.contributorPhoneNumber);
    if (invalidSaudiNumber) {
      invalidFields.push({
        name: "contributorPhoneNumber",
        value: input.contributorPhoneNumber,
        reason: "invalidSaudiNumber",
        defaultMessage:
          `contributorPhoneNumber: ${input.contributorPhoneNumber} is not a valid saudi number`,
      });
    }

    const inputHasInvalidFields = invalidFields.length > 0;
    if (inputHasInvalidFields) {
      await this.outputPort.invalidInputs(invalidFields);
      return;
    }

    const invitedUser = this.userRepo.findByPhoneNumber(
      input.contributorPhoneNumber,
    );
    const invitedUserExist = invitedUser instanceof User;

    if (invitedUserExist) {
      const userIsAlreadyAContributor = await this.walletRepo
        .contributorExist(
          input.walletId,
          invitedUser!.id,
        );

      if (userIsAlreadyAContributor) {
        await this.outputPort.invitedUserIsAlreadyAContributor();
        return;
      }
    }

    const existedInvitation = await this.walletInvitationRepo
      .findByWalletIdAndPhoneNumber(
        input.walletId,
        input.contributorPhoneNumber,
      );
    const invitationExist = existedInvitation instanceof WalletInvitation;

    if (invitationExist) {
      const existedInvitationIsPending =
        existedInvitation?.invitationStatus == InvitationStatus.pending;
      if (existedInvitationIsPending) {
        await this.outputPort.invitedUserHasPendingInvitation();
        return;
      }
    }

    const walletInvitation = new WalletInvitation(
      this.idGenerator.generate(),
      wallet!.id,
      loggedInUser!.id,
      input.contributorPhoneNumber,
    );

    await this.walletInvitationRepo.create(walletInvitation);
    await this.smsSenderImpl.sendInvitationToBeWalletContributor(
      loggedInUser!.phoneNumber,
      wallet!.walletName,
      input.contributorPhoneNumber,
    );
    await this.outputPort.invitationHasBeenSent();
    return;
  }
}
