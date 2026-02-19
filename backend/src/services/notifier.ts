import axios from 'axios';

export const sendNotification = async (productData: { name: string; price: number; url: string; oldPrice?: number }) => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn('N8N_WEBHOOK_URL is not defined in .env');
        return;
    }

    try {
        await axios.post(webhookUrl, productData);
        console.log('Notification sent to n8n');
    } catch (error) {
        console.error('Error sending notification to n8n:', error);
    }
};
