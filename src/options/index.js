import footerTemplate from './templates/footer.hbs';
import bodyTemplate from './templates/body.hbs';
import optionDomainTemplate from './templates/option-domain.hbs';
import errorTemplate from './templates/error.hbs';
import { storageSync } from '../commons/helpers';
import { shortIo, bitLy } from '../commons/variables';
import getShortIoDomain from './scripts/get-short-io-domain';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('ngecilin-options-wrapper');
  const div = document.createElement('div');

  div.innerHTML = bodyTemplate();
  wrapper.appendChild(div);

  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({ year: '2020' });
});

window.onload = async () => {
  const rowApiKey = document.getElementById('row-api-key');
  const rowDomain = document.getElementById('row-domain');
  const rowBitLyToken = document.getElementById('row-bitly-token');
  const apiKey = rowApiKey.querySelector('input');
  const domain = rowDomain.querySelector('select[name=domain]');
  const bitLyToken = rowBitLyToken.querySelector('input');
  const shortenerProvider = document.querySelector(
    'select[name=shortenerProvider]',
  );

  shortenerProvider.addEventListener('change', () => {
    const isShortIo = shortenerProvider.value === shortIo;
    const isBitLy = shortenerProvider.value === bitLy;

    rowApiKey.classList.add('d-none');
    rowDomain.classList.add('d-none');
    rowBitLyToken.classList.add('d-none');

    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
    } else if (isBitLy) {
      rowBitLyToken.classList.remove('d-none');
    } else {
      apiKey.value = '';
      domain.value = '';
      domain.innerHTML = '';
    }
  });

  const storage = storageSync.get(['domain', 'apiKey', 'bitLyToken', 'shortenerProvider']);

  const callDomainOption = (privateKey, { defaultValue }) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getShortIoDomain(privateKey)
      .then((result) => {
        const innerHtml = [];
        result.forEach((customDomain) => {
          innerHtml.push(optionDomainTemplate({ value: customDomain }));
        });
        domain.innerHTML = innerHtml;
        rowApiKey.querySelector('span[data-type*=validation]').innerHTML = '';
        rowDomain.classList.remove('d-none');
        return result;
      })
      .then((results) => {
        if (results.includes(defaultValue)) {
          domain.querySelector(
            `option[value="${defaultValue}"]`,
          ).selected = true;
        } else {
          domain.querySelector(`option[value="${results[0]}"]`).selected = true;
        }
      })
      .catch(() => {
        domain.innerHTML = '';
        rowApiKey.querySelector(
          'span[data-type*=validation]',
        ).innerHTML = errorTemplate({
          error: 'Invalid API Key',
        });
        rowDomain.classList.add('d-none');
      });

  storage.then((data) => {
    shortenerProvider.value = data.shortenerProvider;
    apiKey.value = data.apiKey;
    domain.value = data.domain;
    bitLyToken.value = data.bitLyToken;
    const isShortIo = shortenerProvider.value === shortIo;
    const isBitLy = shortenerProvider.value === bitLy;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
      callDomainOption(data.apiKey, { defaultValue: data.domain });
    }
    if (isBitLy) {
      rowBitLyToken.classList.remove('d-none');
    }
  });

  const form = document.getElementById('options-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    storageSync.clear();
    storageSync.set({
      apiKey: formData.get('apiKey'),
      shortenerProvider: formData.get('shortenerProvider'),
      domain: formData.get('domain'),
      bitLyToken: formData.get('bitLyToken'),
    });

    const saveStatus = document.getElementById('save-status');
    saveStatus.setAttribute(
      'style',
      'transition: opacity 0.4s ease-out 0s; opacity: 1;',
    );
    setTimeout(() => {
      saveStatus.style.opacity = 0;
    }, 1 * 1000);
  });

  form.addEventListener('reset', async () => {
    window.location.reload();
  });

  // add domain
  apiKey.addEventListener('input', async () => {
    if (apiKey.value) {
      callDomainOption(apiKey.value, { defaultValue: await storage.value });
    } else {
      rowApiKey.querySelector('span[data-type*=validation]').innerHTML = '';
      rowDomain.classList.add('d-none');
    }
    domain.value = '';
  });
};
