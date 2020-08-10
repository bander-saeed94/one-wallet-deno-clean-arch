import SmsSender from "../../core/usecase/port/sms-sender.ts";

export default class FakeSmsSender implements SmsSender {
  send(to: string, text: string): void {
    //TODO logger
    console.log(`send: "${text}", to: ${to}`);
  }
}
