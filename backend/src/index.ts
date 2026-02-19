import express from 'express'; // backend restart trigger
import { PrismaClient } from '@prisma/client';
import { checkProduct } from './services/logic';
import cors from 'cors';
import { initScheduler } from './scheduler';

const app = express();
app.use(cors());
const prisma = new PrismaClient();

// Start the scheduler
initScheduler();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('ArbiBot Backend is running!');
});

// Endpoint to manually trigger product check
app.post('/check-product', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            res.status(400).json({ error: 'URL is required' });
            return;
        }

        const result = await checkProduct(url);
        res.json(result);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
});

// Endpoint to list all products
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: { priceHistory: true },
            orderBy: { updatedAt: 'desc' }
        });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
