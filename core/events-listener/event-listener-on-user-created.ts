import EventEmitter from "../usecase/port/event-emitter.ts";
import SendOtpToPhoneNumberUseCase from "../usecase/send-otp-to-phone-number.ts";

export default class EventListenerOnUserCreated {
  constructor(
    public readonly eventEmitter: EventEmitter,
    public readonly sendOtpToPhoneNumberUseCase: SendOtpToPhoneNumberUseCase,
  ) {
    eventEmitter.on("user_has_been_created_with_phone_number", (phoneNumber: string) => {
      console.log("user_created event has been received");
      sendOtpToPhoneNumberUseCase.sendOtp(phoneNumber);
    });
  }
}
