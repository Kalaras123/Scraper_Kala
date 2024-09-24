import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const scrapeWebsite = async () => {
    const month = '08';
    const year = '2024';
    const comicName = 'birdbrains';

    for (let day = 1; day <= 5; day++) {
        const dayString = day.toString().padStart(2, '0');
        const url = `https://www.gocomics.com/${comicName}/${year}/${month}/${dayString}`;

        try {
            console.log(`Fetching page for ${dayString}/${month}/${year}: ${url}`);
            let response = await fetch(url);

            if (!response.ok) {
                console.log(`Error fetching page: ${response.statusText}`);
                continue;
            }

            let html = await response.text();
            const $ = cheerio.load(html);
            let img1 = $('.item-comic-image img');
            let img2 = $('.js-item-comic-link');

            if (img1.attr('src')) {
                console.log(`Found image: ${img1.attr('src')}`);
                console.log(`alt: ${img1.attr('alt')}`);
                console.log(`title: ${img2.attr('title')}`);
                console.log(`srcset: ${img1.attr('srcset')}`);
            } else {
                console.log(`No image found on ${dayString}/${month}/${year}`);
            }
        } catch (error) {
            console.log(`Error fetching page for ${dayString}/${month}/${year}:`, error);
        }
    }
};

scrapeWebsite();