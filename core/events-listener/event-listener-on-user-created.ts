import EventEmitter from "../../UseCases/port/event-emitter.ts";
import SendOtpToPhoneNumberUseCase from "../../UseCases/send-otp-to-phone-number.ts";

export default class EventListenerOnUserCreated {
  private numberOfEvents: number = 0;
  constructor(
    public readonly eventEmitter: EventEmitter,
    public readonly sendOtpToPhoneNumberUseCase: SendOtpToPhoneNumberUseCase,
  ) {
    eventEmitter.on(
      "user_has_been_created_with_phone_number",
      (phoneNumber: string) => {
        this.numberOfEvents++;
        console.log(
          "user_has_been_created_with_phone_number event has been received",
        );
        sendOtpToPhoneNumberUseCase.sendOtp(phoneNumber);
      },
    );
  }

  public getNumberOfEvents(): number {
    return this.numberOfEvents;
  }
}
