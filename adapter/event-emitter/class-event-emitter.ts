import EventEmitter from "../../UseCases/port/event-emitter.ts";

//https://github.com/HowProgrammingWorks/EventEmitter/blob/master/JavaScript/1-simple.js
export default class EventEmitterImpl implements EventEmitter {
  private events: Map<string, ((...args: string[]) => void)[]>; // hash of array of function

  constructor() {
    this.events = new Map();
  }
  public on(name: string, fn: ((...args: string[]) => void)) {
    const event = this.events.get(name);
    if (event) event.push(fn);
    else this.events.set(name, [fn]);
  }

  public emit(name: string, ...data: string[]) {
    const event = this.events.get(name);
    if (!event) return;
    for (const listener of event) listener(...data);
  }
}
