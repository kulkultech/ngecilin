import tinyURLDriver from '@kulkul/tinyurl-client';
import shortIoDriver from './short-io-driver';

import { storageSync } from '../../commons/helpers';
import { shortIo } from '../../commons/variables';

const shortenUrl = async (originalURL, alias) => {
  const storage = await storageSync.get(['shortenerProvider']);

  if (storage.shortenerProvider === shortIo) {
    return shortIoDriver(originalURL, alias);
  }

  return tinyURLDriver(originalURL, alias);
};

export default shortenUrl;
