import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const scrapeWebsite = async () => {
    const month = '08';
    const year = '2024';
    const comicName = 'birdbrains';

    for (let day = 1; day <= 31; day++) {
        const dayString = day.toString().padStart(2, '0');
        const url = 'https://www.gocomics.com/${comicName}/${year}/${month}/${dayString}';

        try {
            console.log(`Fetching page for ${month}/${dayString}/${year}: ${url}`);
            let response = await fetch(url);

            if (!response.ok) {
                console.log(`Error fetching page: ${response.statusText}`);
                continue;
            }

            let html = await response.text();
            const $ = cheerio.load(html);
            let img = $('.comic-image img');

            if (img.attr('src')) {
                console.log(`Found image: ${img.attr('src')}`);
            } else {
                console.log(`No image found on ${month}/${dayString}/${year}`);
            }
        } catch (error) {
            console.log(`Error fetching page for ${month}/${dayString}/${year}:`, error);
        }
    }
};

scrapeWebsite();