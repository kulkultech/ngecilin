import footerTemplate from './templates/footer.hbs';
import bodyTemplate from './templates/body.hbs';
import buttonDomainTemplate from './templates/domain-modal-input-button.hbs';
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
  const domain = rowDomain.querySelector('input[name=domain]');
  const shortenerProvider = document.querySelector(
    'select[name=shortenerProvider]',
  );

  shortenerProvider.addEventListener('change', () => {
    const isShortIo = shortenerProvider.value === shortIo;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
    } else {
      rowApiKey.classList.add('d-none');
      apiKey.value = '';
    }
  });

  const storage = storageSync.get(['domain', 'apiKey', 'shortenerProvider']);

  storage.then((data) => {
    shortenerProvider.value = data.shortenerProvider;
    apiKey.value = data.apiKey;
    domain.value = data.domain;
    const isShortIo = shortenerProvider.value === shortIo;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
      rowDomain.classList.remove('d-none');
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

  form.addEventListener('reset', () => {
    window.location.reload();
  });

  // add domain
  apiKey.addEventListener('input', () => {
    if (apiKey.value) {
      rowDomain.classList.remove('d-none');
    } else {
      rowDomain.classList.add('d-none');
    }
    domain.value = '';
  });

  const domainModal = document.getElementById('domain-modal');
  const modalBody = domainModal.querySelector('div[class*=modal-body]');

  domain.addEventListener('click', async () => {
    getShortIoDomain(apiKey.value)
      .then((result) => {
        const innerHtml = [];
        result.forEach((customDomain) => {
          innerHtml.push(buttonDomainTemplate({ value: customDomain }));
        });
        modalBody.innerHTML = innerHtml;

        const listBtnDomain = modalBody.querySelectorAll('input[type=button]');
        listBtnDomain.forEach((btnDomain) => {
          btnDomain.addEventListener('click', () => {
            domain.value = btnDomain.value;
          });
        });
      })
      .catch(() => {
        modalBody.innerHTML = errorTemplate({ error: 'Domain not found' });
      });
  });
};
