import { storageSync } from '../../commons/helpers';

const axios = require('axios');

const shortenUrl = async (originalURL, alias) => {
  const storage = await storageSync.get(['apiKey', 'domain']);
  const { apiKey, domain } = storage;

  const data = {
    allowDuplicates: false,
    domain,
    originalURL,
    path: alias,
  };

  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: apiKey,
    },

    json: true,
  };

  return new Promise((resolve, reject) => {
    axios
      .post('https://api.short.cm/links/public/', data, options)
      .then((response) => {
        resolve(response.data.secureShortURL);
      })
      .catch((response) => {
        reject(response);
      });
  });
};

export default shortenUrl;
