export default interface SmsSender {
  send(to: string, text: string): void;
}
