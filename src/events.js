class Event {
  constructor(type) {
    this.type = type;
  }
}

class ExtendableEvent extends Event {
  constructor(type) {
    super(type);

    this.promiseResponse= null;
  }

  waitUntil(value) {
    this.promiseResponse = Promise.resolve(value);
  }

  resolve() {
    if (!this.promiseResponse) {
      return Promise.resolve();
    }
    return this.promiseResponse;
  }
}

class InstallEvent extends ExtendableEvent {
  constructor() {
    super('install');
  }
}

class ActivateEvent extends ExtendableEvent {
  constructor() {
    super('activate');
  }
}

class FetchEvent extends ExtendableEvent {
  constructor() {
    super('fetch');
  }

  respondWith() {
    // XXX
  }
}

module.exports = {
  Event,
  InstallEvent,
  ActivateEvent,
  FetchEvent,
};
