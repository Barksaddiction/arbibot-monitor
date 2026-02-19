<h1 align="center">
  🤖 ArbiBot - Automated Price Monitoring System
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/n8n-FF6600?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="License MIT" />
</p>

## 📌 Project Overview

**ArbiBot** is an advanced, automated price monitoring system designed to extract, centralize, and analyze e-commerce data. It solves the critical business problem of tracking market fluctuations by automating the extraction of product information in real-time. By continuously monitoring target items (such as those on Mercado Libre), ArbiBot centralizes vital pricing intelligence and triggers automated alerts to capitalize on market opportunities the moment they arise.

## ✨ Key Features

- **🚀 Advanced Web Scraping:** Robust extraction engine tailored for Mercado Libre, utilizing intelligent selectors and fallback mechanisms to ensure high data accuracy (price, images, titles).
- **🗄️ Relational Data Storage:** Built on a solid PostgreSQL foundation using Prisma ORM to maintain historical price data, allowing for trend analysis over time.
- **📊 Interactive Dashboard:** A sleek, responsive frontend built with Next.js and Tailwind CSS that visualizes tracked products and their price history.
- **🔔 Automated Alerting System:** Seamless integration with **n8n** to process webhooks and dispatch real-time notifications when significant price drops occur.
- **🐳 Containerized Infrastructure:** Fully containerized setup via Docker Compose for a frictionless, reproducible development and deployment environment.

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js (Express)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Scraping Engine:** Axios & Cheerio

### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

### Infrastructure & Automation
- **Database:** PostgreSQL
- **Orchestration:** Docker & Docker Compose
- **Workflow Automation:** n8n

## 🗺️ Architecture & Workflow

1. **Extraction:** A scheduled cron job in the Node.js backend fetches the target URLs and parses the HTML using Cheerio to extract current pricing and metadata.
2. **Storage:** The extracted data is validated and stored in a PostgreSQL database using Prisma, keeping a detailed log in the `PriceHistory` table.
3. **Visualization:** The Next.js frontend queries this database to render up-to-date product cards with trend indicators on the user dashboard.
4. **Automation:** If the backend detects a significant price drop, it fires a webhook to an n8n workflow. The n8n automation then processes this payload to send customized alerts via email, Slack, or Telegram.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL (if running locally without Docker)

### 1. Clone the repository
```bash
git clone https://github.com/Barksaddiction/arbibot-monitor.git
cd arbibot-monitor
```

### 2. Environment Variables
You need to configure the environment variables for both the backend and frontend.

**Backend (`/backend/.env`)**
Create a `.env` file in the backend directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/arbibot?schema=public"
N8N_WEBHOOK_URL="http://localhost:5678/webhook/your-webhook-id"
PORT=3000
```

**Frontend (`/frontend/.env.local`)**
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Run with Docker Compose (Recommended)
This will spin up the PostgreSQL database and the n8n instance automatically.
```bash
docker-compose up -d
```

### 4. Running the Application Locally
After the database is running via Docker, you can start the services manually for development:

**Backend:**
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3001` (or 3000 depending on your config).

## 💡 Usage

1. Start all services.
2. Open the frontend dashboard in your browser.
3. Use the backend API (or a future frontend form) to add a new Mercado Libre product URL to the database.
4. The system will automatically scrape the data on its scheduled interval.
5. Watch the dashboard update with the latest prices and trends.
6. Configure your n8n workflows at `http://localhost:5678` to listen to the backend webhooks and trigger your desired notification flows.

## 🤖 Role as Automation Consultant

ArbiBot is not just a scraper; it is a demonstration of sophisticated workflow automation. Integrating the custom Node.js backend with **n8n** showcases the ability to bridge custom code with no-code/low-code orchestration tools. This hybrid approach enables the creation of highly scalable, easy-to-maintain business workflows—proving my capability to design systems that don't just gather data, but actively drive business decisions through automated, real-time alerts.

## 📬 Contact / Author

- **GitHub:** [Barksaddiction](https://github.com/Barksaddiction)
- **LinkedIn:** [Jose Pablo Barquero ](https://www.linkedin.com/in/jose-pablo-barquero-montero-237696262/)

---
*If you find this project interesting, feel free to ⭐ the repository or reach out for collaboration!*
