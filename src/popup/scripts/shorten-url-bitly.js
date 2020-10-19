const shortenBitLy = async (token, url, groupId, alias="") => {
  const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "long_url": `${url}`, "domain": "bit.ly", "group_guid": `${groupId}` })
});
  const results = await response.json()
  return results
}

export default shortenBitLy