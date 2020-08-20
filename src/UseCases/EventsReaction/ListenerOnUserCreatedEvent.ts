import EventEmitter from "../../UseCases/port/event-emitter.ts";
import { SendOtpToPhoneNumberInputPort } from "../SendOtpToPhoneNumber/mod.ts";

export default class ListenerOnUserCreatedEvent {
  private numberOfEvents: number = 0;
  constructor(
    public readonly eventEmitter: EventEmitter,
    public readonly sendOtpToPhoneNumberInteractor:
      SendOtpToPhoneNumberInputPort,
  ) {
    eventEmitter.on(
      "user_has_been_created_with_phone_number",
      (phoneNumber: string) => {
        this.numberOfEvents++;
        console.log(
          "user_has_been_created_with_phone_number event has been received",
        );
        sendOtpToPhoneNumberInteractor.execute({ phoneNumber });
      },
    );
  }

  public getNumberOfEvents(): number {
    return this.numberOfEvents;
  }
}
