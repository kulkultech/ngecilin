const formTemplate = require("./templates/form.hbs");
const footerTemplate = require("./templates/footer.hbs");

document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.getElementById('ngecilin-wrapper');
  wrapper.innerHTML = formTemplate({ shortenlink: 'https://kul.to/hf' });

  const footer = document.querySelector('footer');
  footer.innerHTML = footerTemplate({ year: new Date().getFullYear() });
});

