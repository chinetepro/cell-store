import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import * as EN from '../locales/en';
import * as ES from '../locales/es';
import * as RU from '../locales/ru';

// the translations
const resources = {
    es: {},
    en: {},
    ru: {},
};

Object.keys(EN).forEach(name => {
    resources.en[name] = name === 'common' ? EN[name] : Object.assign({}, EN.common, EN[name]);
});

Object.keys(ES).forEach(name => {
    resources.es[name] = name === 'common' ? ES[name] : Object.assign({}, ES.common, ES[name]);
});

Object.keys(RU).forEach(name => {
    resources.ru[name] = name === 'common' ? RU[name] : Object.assign({}, RU.common, RU[name]);
});


const options = {
    interpolation: {
        escapeValue: false, // not needed for react!!
        format: (value, format, lng) => {
            if (format === 'intlMoney') {
                const [v, currency] = value;
                return Intl.NumberFormat(lng, {
                    currency,
                    style: 'currency',
                }).format(v);
            }
            if (format === 'uppercase') return value.toUpperCase();
            return value;
        }
    },

    debug: true,

    lng: 'en',

    resources,

    fallbackLng: 'en',

    ns: ['common'],

    defaultNS: 'common',

    react: {
        wait: false,
        bindI18n: 'languageChanged loaded',
        bindStore: 'added removed',
        nsMode: 'common.json'
    },
};

i18n
    .use(LanguageDetector) // passes i18n down to react-i18next
    .init(options);


export default i18n;
