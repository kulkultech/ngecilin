import tinyURLDriver from '@kulkul/tinyurl-client';
import shortIoDriver from './short-io-driver';
import bitLyDriver from './bitly-driver';

import { storageSync } from '../../commons/helpers';
import { shortIo, bitLy } from '../../commons/variables';

const shortenUrl = async (originalURL, alias) => {
  const storage = await storageSync.get(['shortenerProvider']);

  if (storage.shortenerProvider === shortIo) {
    return shortIoDriver(originalURL, alias);
  }

  if (storage.shortenerProvider === bitLy) {
    return bitLyDriver(originalURL);
  }

  return tinyURLDriver(originalURL, alias);
};

export default shortenUrl;
