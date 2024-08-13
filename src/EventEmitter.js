class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    const currentListener = {
      id: new Date().getTime(),
      fn: listener,
    };
    this.events[event].push(currentListener);
    return currentListener.id;
  }
  emit(event, data) {
    let listeners = this.events[event];
    if (listeners) {
      listeners.forEach((listener) => listener.fn(data));
    }
  }
  remove(event, listenerId) {
    this.events[event] = this.events[event].filter(
      (listener) => listener.id !== listenerId
    );
  }
}

/**
 * Exporting only the eventEmitter instance to ensure
 * all listeners on single instance
 */
export const eventEmitter = new EventEmitter();
