import uaTranslations from '../translations/ua.json';
import enTranslations from '../translations/en.json';

const translations = {
  ua: uaTranslations,
  en: enTranslations,
};

const languageSelects = document.querySelectorAll('.language-select');
let currentLanguage = localStorage.getItem('lang') || 'en';

function updateMetaTags(lang) {
  const currentLangTranslations = translations[lang];
  if (currentLangTranslations && currentLangTranslations.meta) {
    document.title = currentLangTranslations.meta.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', currentLangTranslations.meta.description);
  } else {
    document.title = 'Iryna Panasiuk | Fullstack Developer Portfolio';
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        'Portfolio of Iryna Panasiuk, a Fullstack Developer specializing in modern web technologies. Explore projects in HTML, CSS, JavaScript, React, Node.js, and more.'
      );
  }
}

function applyTranslations(lang) {
  const currentLangTranslations = translations[lang];

  document.querySelectorAll('[data-lang-key]').forEach(element => {
    const key = element.getAttribute('data-lang-key');
    const value = getNestedValue(currentLangTranslations, key);

    if (value) {
      if (element.hasAttribute('data-lang-attribute')) {
        const attribute = element.getAttribute('data-lang-attribute');

        if (
          attribute === 'href' &&
          (key === 'hero.social_resume' || key === 'footer.resume')
        ) {
          const linkKey = key + '_link';
          const linkValue = getNestedValue(currentLangTranslations, linkKey);
          if (linkValue) {
            element.setAttribute(attribute, linkValue);
          }

          element.innerHTML = value;
        } else {
          element.setAttribute(attribute, value);
        }
      } else {
        element.innerHTML = value;
      }
    }
  });

  updateMetaTags(lang);

  languageSelects.forEach(select => {
    select.value = lang;
  });
}

function getNestedValue(obj, key) {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

applyTranslations(currentLanguage);

languageSelects.forEach(select => {
  select.addEventListener('change', event => {
    const lang = event.target.value;
    localStorage.setItem('lang', lang);
    currentLanguage = lang;
    applyTranslations(lang);
  });
});
