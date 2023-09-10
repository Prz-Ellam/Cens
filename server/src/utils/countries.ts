import countries from 'i18n-iso-countries';

// eslint-disable-next-line @typescript-eslint/no-var-requires
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
const allCountries = Object.keys(countries.getNames('es'));

export { allCountries };
