const path = require('path');

const fetch = require('window-fetch');
const nativeWorker = require('worker-native');

/* const ServiceWorkerGlobalScope = require('./worker/serviceworker-global-scope');
const FetchEvent = require('./worker/fetchevent');
const url = require('url');
const ExtendableEvent = require('./worker/extendable-event');
const fetch = require('node-fetch');
const applyFuncWithGlobals = require('./util/apply-func-with-globals');

const installAndActivate = require('./util/install-and-activate');
const resolveExtendableEvent = require('./util/resolve-extendable-event'); */

class ServiceWorker {
  // constructor({scriptURL, scope, contents, interceptFetch, importScript}) {
  constructor(scriptUrl, scope) {
    const worker = nativeWorker.make({
      initModule: path.join(__dirname, 'src', 'service-worker.js'),
      args: {
        scriptUrl,
        scope,
      },
    });
    /* worker.on('error', err => {
      console.warn(err.stack);
    }); */

    /* this.globalScope = new ServiceWorkerGlobalScope({scope, interceptFetch, importScript});
    this.caches = this.globalScope.caches;
    this.globalScope.registration.scope = scope;
    this.dispatchEvent = this.globalScope.dispatchEvent.bind(this.globalScope)

    applyFuncWithGlobals(this.globalScope, contents); */

    // We need to grab items from our globalScope object and apply them to the 
    // actual global scope the worker will run in.
    // let keysToApplyToGlobal = getAllKeys(this.globalScope);
    // let objectsToApplyToGlobal = keysToApplyToGlobal.map((key) => {

    //     if (typeof this.globalScope[key] === "function") {
    //         // If it's a function we want to ensure that it stays bound
    //         // to the global scope object.
    //         return this.globalScope[key].bind(this.globalScope);
    //     } else {
    //         return this.globalScope[key];
    //     }
        
    // });

    // keysToApplyToGlobal.forEach((key, i) => {
    //     this[key] = objectsToApplyToGlobal[i];
    // });
  }
}

const serviceWorker = {
  register(scriptUrl, options = {}) {
    if (!options.scope) {
      options.scope = 'file://' + __dirname + '/';
    }
    const serviceWorker = new ServiceWorker(scriptUrl, options.scope);
    return Promise.resolve({
      // XXX ServiceWorkerRegistration
    });
  },
  /* ServiceWorker,
  FetchEvent,
  ExtendableEvent,
  Request: fetch.Request,
  Response: fetch.Response,
  installAndActivate,
  resolveExtendableEvent */
};
module.exports = serviceWorker;

if (module === require.main) {
  serviceWorker.register(process.argv[2]);
}
