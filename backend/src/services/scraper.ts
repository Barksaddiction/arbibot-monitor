import axios from 'axios';
import * as cheerio from 'cheerio';

export class ScraperService {
    async scrape(url: string): Promise<{ name: string; price: number; url: string; imagen?: string } | null> {
        // Mock mode for testing n8n integration
        if (url.includes('test') || url.includes('mock')) {
            const randomPrice = Math.floor(Math.random() * 1000) + 100; // Random price between 100 and 1100
            console.log('Test URL detected, returning mock data with random price:', randomPrice);
            return {
                name: 'Producto de Prueba para n8n',
                price: randomPrice,
                url: url,
                imagen: 'https://http.cat/200'
            };
        }

        try {
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                }
            });

            const $ = cheerio.load(data);

            // 1. Extract Name
            const name = $('h1.ui-pdp-title').text().trim() || $('title').text().trim();

            // 2. Extract Price
            let price = 0;
            let priceText = '';
            const metaPrice = $('meta[itemprop="price"]').attr('content');

            if (metaPrice) {
                // Meta tag content is usually "1234.56" (float format)
                price = parseFloat(metaPrice);
                priceText = metaPrice;
            } else {
                // Fallback to text scraping (displayed as "1.234" or "1.234,50")
                const priceElement = $('.ui-pdp-price__second-line .andes-money-amount__fraction').first();

                if (priceElement.length > 0) {
                    priceText = priceElement.text().trim();
                } else {
                    const genericPrice = $('.andes-money-amount__fraction').first().text().trim();
                    if (genericPrice) priceText = genericPrice;
                }

                if (priceText) {
                    const cleanText = priceText.replace(/\./g, '').replace(',', '.');
                    price = parseFloat(cleanText);
                }
            }

            // 3. Extract Image
            let image = $('meta[property="og:image"]').attr('content') ||
                $('meta[name="twitter:image"]').attr('content') ||
                $('img.ui-pdp-image').first().attr('src') ||
                $('.ui-pdp-gallery__figure__image').first().attr('src');


            if (!name || isNaN(price) || price === 0) {
                console.error('Failed to extract valid data', { name, priceText, price });
                return null;
            }

            console.log(`Scraped: ${name} - $${price}`);

            return {
                name,
                price,
                url,
                imagen: image
            };

        } catch (error: any) {
            console.error('Error scraping URL:', error.message);
            if (error.response) {
                console.error('Status:', error.response.status);
            }
            return null;
        }
    }
}
