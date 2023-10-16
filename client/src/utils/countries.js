import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// console.log(enLocale.countries);

countries.registerLocale(enLocale);
// countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const allCountries = enLocale.countries;

export { allCountries };
