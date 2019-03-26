const url = require('url');
const fetch = require('window-fetch');

class Cache {
  constructor(name, scope) {
    this.name = name;
    this.scope = scope;

    this.entries = [];
  }

  matchSync(request, options = {}) {
    let result;
    for (const k in this.entries) {
      const res = this.entries[k];
      if (res.match(request), options) {
        return res;
      }
    }
  }

  match(request, options = {}) {
    return Promise.resolve(this.matchSync(request, options));
  }

  matchAll(request, options = {}) {
    const results = [];
    for (const k in this.entries) {
      const res = this.entries[k];
      if (res.matchSync(request, options)) {
        results.push(res);
      }
    }
    return Promise.resolve(results);
  }

  add(u) {
    if (/^\//.test(u)) {
      u = '.' + u;
    }
    u = new url.URL(u, this.scope).href;

    return fetch(u).then(response => {
      if (response.ok) {
        return this.put(url, response);
      } else {
        throw new TypeError('bad response status');
      }
    });
  }

  addAll(urls) {
    return Promise.all(urls.map(u => this.add(u))).then(() => {});
  }

  put(u, res) {
    this.entries[u] = res;
  }

  delete(u) {
    delete this.entries[u];
  }

  keys() {
    return Promise.resolve(Object.keys(this.entries));
  }
}

class ServiceWorkerCache {
  constructor(scope) {
    this.scope = scope;
    this.caches = [];
  }

  match() {
    return Promise.reject(new Error('No cache matching available in node environment'));
  }

  open(name) {
    let cacheInstance = this.caches.find(c => c.name === name);

    if (!cacheInstance) {
      cacheInstance = new Cache(name, this.scope);
      this.caches.push(cacheInstance);
    }

    return Promise.resolve(cacheInstance);
  }

  keys() {
    return Promise.resolve(this.caches.map(c => c.name));
  }

  delete(name) {
    let cacheInstance = this.caches.find(c => c.name === name);
    if (!cacheInstance) {
      return;
    }
    let indexOfCache = this.caches.indexOf(cacheInstance);
    this.caches.splice(indexOfCache, 1);
  }
}

module.exports = ServiceWorkerCache;
