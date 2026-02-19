import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { checkProduct } from './services/logic';

const prisma = new PrismaClient();

export const initScheduler = () => {
    // Schedule task to run every 6 hours
    // Cron expression: "0 */6 * * *"
    // For testing/debugging, you can use "* * * * *" to run every minute
    cron.schedule('0 */6 * * *', async () => {
        console.log('⏰ [Scheduler] Starting scheduled product check...');

        try {
            const products = await prisma.product.findMany();
            console.log(`🔎 [Scheduler] Found ${products.length} products to check.`);

            for (const product of products) {
                try {
                    console.log(`   Processing: ${product.nombre}`);
                    await checkProduct(product.url);
                } catch (error) {
                    console.error(`   ❌ Error checking product ${product.id} (${product.nombre}):`, error);
                    // Continue with next product, don't stop the loop
                }
            }

            console.log('✅ [Scheduler] Scheduled check completed.');
        } catch (error) {
            console.error('🔥 [Scheduler] Critical error during scheduled task:', error);
        }
    });

    console.log('Checking scheduler... OK (Job scheduled for every 6 hours)');
};
