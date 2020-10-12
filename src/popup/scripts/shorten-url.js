import driver from "@kulkul/tinyurl-client";

const shortenUrl = async (originalURL, alias) => {
  return driver(originalURL, alias);
};

export default shortenUrl;
