const axios = require('axios');

const getShortIoDomain = async (apiKey) => {
  const options = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: apiKey,
    },
  };

  return new Promise((resolve, reject) => {
    axios
      .get('https://api.short.cm/api/domains', options)
      .then((response) => {
        resolve(response.data.map((data) => data.hostname));
      })
      .catch((response) => {
        reject(response);
      });
  });
};

export default getShortIoDomain;
