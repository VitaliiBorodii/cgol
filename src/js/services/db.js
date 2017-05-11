var db;

function getDB(name) {
  if (!db) {
    db = new Promise((resolve, reject) => {
      const openreq = indexedDB.open(`${name}-db`, 1);

      openreq.onerror = () => {
        reject(openreq.error);
      };

      openreq.onupgradeneeded = () => {
        // First time setup: create an empty object store
        openreq.result.createObjectStore(name);
      };

      openreq.onsuccess = () => {
        resolve(openreq.result);
      };
    });
  }
  return db;
}

function withStore(name, type, callback) {
  return getDB(name).then((db) => {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(name, type);
      transaction.oncomplete = () => {
        resolve();
      };
      transaction.onerror = () => {
        reject(transaction.error);
      };
      callback(transaction.objectStore(name));
    });
  });
}

function idbKeyval(name) {
  this.name = name;
  return this;
}

idbKeyval.prototype = {
  get(key) {
    var req;
    return withStore(this.name, 'readonly', (store) => {
      req = store.get(key);
    }).then(function () {
      return req.result;
    });
  },

  set(key, value) {
    return withStore(this.name, 'readwrite', (store) => {
      store.put(value, key);
    });
  },

  delete (key) {
    return withStore(this.name, 'readwrite', (store) => {
      store.delete(key);
    });
  },

  getAll() {
    var req;
    return withStore(this.name, 'readonly', (store) => {
      req = store.getAll();
    }).then(function () {
      return req.result;
    });
  },

  getLast() {
    return this.keys().then(keys => {
      const last = keys.pop();
      return last ? this.get(last).then(result => ({
        step: last,
        cells: result
      })) : null;
    })
  },

  clear() {
    return withStore(this.name, 'readwrite', (store) => {
      store.clear();
    });
  },

  keys () {
    var keys = [];
    return withStore(this.name, 'readonly', (store) => {
      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // And openKeyCursor isn't supported by Safari.
      (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
        if (!this.result) return;
        keys.push(this.result.key);
        this.result.continue();
      };
    }).then(function () {
      return keys;
    });
  }
};

export default new idbKeyval('life');
