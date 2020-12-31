import { storageSync } from '../commons/helpers';
import { bitLy } from '../commons/variables';
import formTemplate from './templates/form.hbs';
import shortenTemplate from './templates/shorten.hbs';
import footerTemplate from './templates/footer.hbs';
import errorTemplate from './templates/error.hbs';
import shortenUrl from './scripts/shorten-url';

document.addEventListener('DOMContentLoaded', async () => {
  const { shortenerProvider } = await storageSync.get(['shortenerProvider']);
  const wrapper = document.getElementById('ngecilin-wrapper');
  const form = document.createElement('div');

  const aliasDisabled = shortenerProvider === bitLy ? 'disabled' : '';

  form.innerHTML = formTemplate({ isDisabled: aliasDisabled });
  wrapper.appendChild(form);

  const shortenText = document.querySelector('#form>input[name=url]');
  const shortenAlias = document.querySelector('#form>input[name=alias]');
  const shortenBtn = document.querySelector('#form>button');

  chrome.tabs.getSelected(null, (tab) => {
    shortenText.value = tab.url;
  });

  shortenBtn.addEventListener(
    'click',
    async () => {
      wrapper.querySelector('#shorten').innerHTML = 'loading...';
      shortenUrl(shortenText.value, shortenAlias.value)
        .then((result) => {
          wrapper.querySelector('#shorten').innerHTML = shortenTemplate({
            shortenurl: result,
          });
        })
        .catch(() => {
          wrapper.querySelector('#shorten').innerHTML = errorTemplate({
            error: "Alias can't be used or already taken",
          });
        });
    },
    false,
  );

  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({ year: new Date().getFullYear() });
});
