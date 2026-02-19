import { PrismaClient } from '@prisma/client';
import { ScraperService } from './scraper';
import { sendNotification } from './notifier';

const prisma = new PrismaClient();
const scraper = new ScraperService();

export const checkProduct = async (url: string) => {
    console.log(`Checking product: ${url}`);
    const data = await scraper.scrape(url);

    if (!data) {
        throw new Error('Could not scrape product data');
    }

    const { name, price } = data;

    // 1. Find or Create Product
    let product = await prisma.product.findFirst({
        where: { url },
    });

    let oldPrice = undefined;

    if (!product) {
        console.log('New product detected, creating...');
        product = await prisma.product.create({
            data: {
                nombre: name,
                url: url,
                tienda: 'MercadoLibre', // Hardcoded for now, could be dynamic
                precio_actual: price,
            },
        });
    } else {
        oldPrice = product.precio_actual;
        // Update current price if changed
        if (price !== oldPrice) {
            console.log(`Price changed from ${oldPrice} to ${price}`);
            await prisma.product.update({
                where: { id: product.id },
                data: { precio_actual: price },
            });
        }
    }

    // 2. Add History
    await prisma.priceHistory.create({
        data: {
            precio: price,
            productId: product.id,
        },
    });

    // 3. Notify if price dropped (or generic alert for now)
    // Logic: Notify if it's a new product OR price < oldPrice
    if (!oldPrice || price < oldPrice) {
        console.log('Sending notification...');
        await sendNotification({
            name,
            price,
            url,
            oldPrice,
        });
    }

    return { product, price, oldPrice };
};
