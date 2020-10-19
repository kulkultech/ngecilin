import footerTemplate from './templates/footer.hbs';
import bodyTemplate from './templates/body.hbs';
import optionDomainTemplate from './templates/option-domain.hbs';
import errorTemplate from './templates/error.hbs';
import { storageSync } from '../commons/helpers';
import { shortIo } from '../commons/variables';
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
  const apiKey = rowApiKey.querySelector('textarea');
  const domain = rowDomain.querySelector('select[name=domain]');
  const shortenerProvider = document.querySelector(
    'select[name=shortenerProvider]',
  );

  shortenerProvider.addEventListener('change', () => {
    const isShortIo = shortenerProvider.value === shortIo;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
    } else {
      rowApiKey.classList.add('d-none');
      rowDomain.classList.add('d-none');
      apiKey.value = '';
      domain.value = '';
      domain.innerHTML = '';
    }
  });

  const storage = storageSync.get(['domain', 'apiKey', 'shortenerProvider']);

  const callDomainOption = (privateKey, { defaultValue }) =>
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
    const isShortIo = shortenerProvider.value === shortIo;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
      callDomainOption(data.apiKey, { defaultValue: data.domain });
    }
  });

  const form = document.getElementById('options-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    storageSync.set({
      apiKey: formData.get('apiKey'),
      shortenerProvider: formData.get('shortenerProvider'),
      domain: formData.get('domain'),
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
