export class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  emit(event, data) {
    let listeners = this.events[event];
    if (listeners) {
      listeners.forEach((listener) => listener(data));
    }
  }
}
