try {
const events = require('events');
const {EventEmitter} = events;
const fetch = require('window-fetch');
const CacheStorage = require('./service-worker-cache');
const {InstallEvent, ActivateEvent} = require('./events');

const {scriptUrl, scope} = global.args;

global.self = global;
global.Request = fetch.Request;
global.Response = fetch.Response;
global.registration = {
  scope,
};
global.clients = {
  claim() {
    return Promise.resolve(null);
  },
  matchAll() {
    return Promise.resolve([]);
  },
}
global.caches = new CacheStorage(scope);

const handler = new EventEmitter();
global.addEventListener = (e, cb) => handler.on(e, cb);
global.removeEventListener = (e, cb) => handler.removeListener(e, cb);
global.dispatchEvent = e => handler.emit(e.type, e);

importScripts(scriptUrl);

handler.emit('install', new ActivateEvent());
handler.emit('activate', new InstallEvent());

/* fetch(scriptUrl)
  .then(res => {
    if (res.ok) {
      return res.text();
    } else {
      return Promise.reject(new Error(`invalid status code: ${res.status}`));
    }
  })
  .then(src => {
    i
  }); */

/* const BrowserStyleEvents = require('./browser-style-events');
const EventEmitter = require('events').EventEmitter;
const fetch = require('node-fetch');
const CacheStorage = require('./cache-storage');
const applyIndexedDBTo = require('./indexeddb');
const Console = require('./console');
const applyFuncWithGlobals = require('../util/apply-func-with-globals');


function createImportScripts(importFunction, globalScope) {
    return function() {

        // importScripts can be run with an unlimited number of script arguments
        let scripts = Array.from(arguments);

        scripts.forEach((url) => {
            // Run our external function that will grab the content of the url
            // we provide.
            let scriptContent = importFunction(url);

            // Then execute this function, bound to the global scope.
            applyFuncWithGlobals(globalScope, scriptContent)
        })
    }
}

module.exports = class ServiceWorkerGlobalScope {
    constructor({scope, interceptFetch, importScript}) {

        if (interceptFetch) {
            this.fetch = function() {
                let ret = interceptFetch(arguments, fetch);

                if (!ret || !ret.then) {
                    return Promise.reject(new Error("You must return a promise in interceptFetch"));
                }

                return ret;

            }
        } else {
            this.fetch = fetch;
        }

        if (!importScript) {
            console.warn("No importScript function provided to worker context");
            importScript = function() {
                throw new Error("importScript function was not provided to worker context");
            }
        }

        this.importScripts = createImportScripts(importScript, this);

        this.Request = fetch.Request;
        this.Response = fetch.Response;
        this._events = new EventEmitter();
        this.console = new Console();

        this.self = this;

        this.registration = {
            scope: scope
        }

        this.clients = {
            claim: function() {
                return Promise.resolve(null)
            },
            matchAll: function() {
                return Promise.resolve([])
            }
        }
        
        this.caches = new CacheStorage(scope);
        applyIndexedDBTo(this);
    }


    addEventListener(ev, listener) {
        return this._events.addListener(ev, listener)
    }

    removeEventListener(ev, listener) {
        return this._events.removeListener(ev, listener);
    }

    dispatchEvent(ev) {
        return this._events.emit(ev.type, ev);
    }

    skipWaiting() {

    }
}; */
} catch(err) {
  console.warn(err.stack);
}
