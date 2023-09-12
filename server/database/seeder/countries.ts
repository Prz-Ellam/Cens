import { connection } from '@/config/database';
import Country from '@/models/country.model';
import { allCountries } from '@/utils/countries';

const countries: [string, ...string[]] = [
    allCountries[0],
    ...allCountries.slice(1),
];

async function seedCountries(): Promise<void> {
    await connection.initialize();
    try {
        for (const countryName of countries) {
            const country = new Country();
            country.name = countryName;
            await connection.manager.save(country);
        }

        console.log('Countries seeded successfully.');
    } catch (error) {
        console.error('Error seeding countries:', error);
    } finally {
        await connection.destroy();
    }
}

void seedCountries();
