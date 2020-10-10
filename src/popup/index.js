import formTemplate from './templates/form.hbs';
import shortenTemplate from './templates/shorten.hbs';
import footerTemplate from './templates/footer.hbs';
import shortenUrl from './scripts/shorten-url';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('ngecilin-wrapper');
  const form = document.createElement('div');

  form.innerHTML = formTemplate();
  wrapper.appendChild(form);

  const shortenText = document.querySelector('#form>input[type=text]');
  const shortenBtn = document.querySelector('#form>button');

  chrome.tabs.getSelected(null, (tab) => {
    shortenText.value = tab.url;
  });

  shortenBtn.addEventListener('click', async (e) => {
    wrapper.querySelector('#shorten').innerHTML = 'loading...';
    shortenUrl(shortenText.value).then((result) => {
      wrapper.querySelector('#shorten').innerHTML = shortenTemplate({ shortenurl: result });
    });
  }, false);

  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({ year: new Date().getFullYear() });
});
