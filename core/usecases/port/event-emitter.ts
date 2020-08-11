export default interface EventEmitter {
  on(event: string, listener: (...data: any[]) => void): void;

  emit(event: string, ...data: any[]): void;
}
