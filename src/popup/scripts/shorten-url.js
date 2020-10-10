import driver from "@kulkul/tinyurl-client";

const shortenUrl = async (originalURL) => {
  return driver(originalURL);
};

export default shortenUrl;
