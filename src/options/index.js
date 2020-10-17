import footerTemplate from './templates/footer.hbs';
import bodyTemplate from './templates/body.hbs';
import { storageSync } from '../commons/helpers';
import { shortIo } from '../commons/variables';

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
  const apiKey = rowApiKey.querySelector('textarea');
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

  const storage = storageSync.get(['apiKey', 'shortenerProvider']);

  storage.then((data) => {
    shortenerProvider.value = data.shortenerProvider;
    apiKey.value = data.apiKey;
    const isShortIo = shortenerProvider.value === shortIo;
    if (isShortIo) {
      rowApiKey.classList.remove('d-none');
    }
  });

  const form = document.getElementById('options-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    storageSync.set({
      apiKey: formData.get('apiKey'),
      shortenerProvider: formData.get('shortenerProvider'),
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
};
