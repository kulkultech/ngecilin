import { tinyURL } from '../commons/variables';
import { storageSync } from '../commons/helpers';

/**
 * Fired when the extension is first installed,
 * when the extension is updated to a new version,
 * and when Chrome is updated to a new version.
 */
chrome.runtime.onInstalled.addListener(async () => {
  const storage = storageSync.get(['shortenerProvider']);

  storage.then((data) => {
    if (!data.shortenerProvider) {
      storageSync.set({
        shortenerProvider: tinyURL,
        domain: '',
        apiKey: '',
        bitLyToken: '',
      });
    }
  });
});
