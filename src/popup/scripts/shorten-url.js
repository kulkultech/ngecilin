import driver from '@kulkul/tinyurl-client';

const shortenUrl = async (originalURL, alias) => driver(originalURL, alias);

export default shortenUrl;
