export const storageSync = {
  get: async (key) =>
    new Promise((resolve) => {
      chrome.storage.sync.get([].concat(key), (data) => resolve(data));
    }),
  set: async (obj) =>
    new Promise((resolve) => {
      chrome.storage.sync.set(obj, (data) => resolve(data));
    }),
  clear: async () =>
    new Promise((resolve) => {
      chrome.storage.sync.set({}, (data) => resolve(data));
    }),
};

export default { storageSync };
