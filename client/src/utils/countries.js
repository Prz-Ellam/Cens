import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);
const allCountries = enLocale.countries;

console.log(allCountries);

export { allCountries };
