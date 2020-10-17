import footerTemplate from './templates/footer.hbs';
import bodyTemplate from './templates/body.hbs';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.getElementById('ngecilin-options-wrapper');
  const div = document.createElement('div');

  div.innerHTML = bodyTemplate();
  wrapper.appendChild(div);

  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({ year: '2020' });
});
