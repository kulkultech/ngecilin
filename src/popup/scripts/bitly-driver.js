import BitLyService from '@kulkul/bitly-client';
import { storageSync } from '../../commons/helpers';

const shortenUrl = async (originURL) => {
  const { bitLyToken } = await storageSync.get(['bitLyToken']);
  const bitLyService = new BitLyService(bitLyToken);
  return bitLyService.shorten(originURL);
};

export default shortenUrl;
