#!/usr/bin/env bash

function check_var(){
  if [ -z "$1" ]; then
    echo "$2" is not set
    exit 1
  fi
}

check_var "$CHROME_CLIENT_ID" CHROME_CLIENT_ID
check_var "$CHROME_CLIENT_SECRET" CHROME_CLIENT_SECRET
check_var "$CHROME_REFRESH_TOKEN" CHROME_REFRESH_TOKEN
check_var "$CHROME_APP_ID" CHROME_APP_ID

echo "===Getting access token"
CHROME_ACCESS_TOKEN=$(curl "https://accounts.google.com/o/oauth2/token" -d "client_id=${CHROME_CLIENT_ID}&client_secret=${CHROME_CLIENT_SECRET}&refresh_token=${CHROME_REFRESH_TOKEN}&grant_type=refresh_token&redirect_uri=urn:ietf:wg:oauth:2.0:oob" | jq -r .access_token)
echo "===Access token granted"

echo "===Uploading artifacts"
curl -H "Authorization: Bearer ${CHROME_ACCESS_TOKEN}" -H "x-goog-api-version: 2" -X PUT -T public.zip -v "https://www.googleapis.com/upload/chromewebstore/v1.1/items/${CHROME_APP_ID}"

echo "===Publishing artifacts"
curl -H "Authorization: Bearer ${CHROME_ACCESS_TOKEN}" -H "x-goog-api-version: 2" -H "Content-Length: 0" -X POST -v "https://www.googleapis.com/chromewebstore/v1.1/items/${CHROME_APP_ID}/publish"
