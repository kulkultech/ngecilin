/* eslint-disable global-require */
require('dotenv').config();

const manifest = {
  name: 'Ngecilin Extension',
  version: process.env.VERSION,
  description: 'Chrome Extension to shorten your looooong URL.',
  manifest_version: 2,
  permissions: ['tabs', 'storage', '*://api.short.cm/*'], // simply add *://api.short.cm/* to fixed CORS issue
  content_security_policy: "script-src 'self'; object-src 'self'",
  options_page: 'options/index.html',
  background: {
    scripts: ['background/index.js'],
    persistent: true,
  },
  web_accessible_resources: [],
  content_scripts: [],
  browser_action: {
    default_title: 'Ngecilin Extension',
    default_icon: {
      16: 'assets/icons/icon-ngecilin-16.png',
      32: 'assets/icons/icon-ngecilin-32.png',
      48: 'assets/icons/icon-ngecilin-48.png',
      128: 'assets/icons/icon-ngecilin-128.png',
    },
    default_popup: 'popup/index.html',
  },
  commands: {
    _execute_browser_action: {
      suggested_key: {
        default: 'Ctrl+Shift+P',
        mac: 'MacCtrl+Shift+P',
      },
      description: 'Open Ngecilin Extension',
    },
  },
  icons: {
    16: 'assets/icons/icon-ngecilin-16.png',
    32: 'assets/icons/icon-ngecilin-32.png',
    48: 'assets/icons/icon-ngecilin-48.png',
    128: 'assets/icons/icon-ngecilin-128.png',
  },
};

if (process.env.NODE_ENV === 'development') {
  const fs = require('fs');
  const path = require('path');
  const key = path.resolve('key', 'manifest.key');
  manifest.key = fs.readFileSync(key, 'utf8');
}

module.exports = {
  manifest,
  filters: Object.keys(manifest),
};
