# Finance Dashboard Application
## 🚀 **Elevator Pitch**
A comprehensive, real-time financial analytics platform that empowers investors and traders with AI-powered insights, interactive charting, sentiment analysis, and market data visualization. Built with React and Node.js, this application aggregates data from multiple financial APIs to provide a unified dashboard experience for tracking stocks, analyzing trends, and making informed investment decisions.

## 📊 **Key Features**

### **Market Overview**
- Real-time Stock Tracking: Live price updates and percentage changes for major market indices (NASDAQ, S&P 500, Dow Jones)
- Interactive Charts: Dynamic price and volume visualization with multiple timeframe options (15-minute, daily, weekly, monthly intervals)
- Customizable Watchlist: Add and track your favorite stocks with real-time updates

### **Advanced Analytics**
- Top Gainers & Losers: Instantly view market movers with sortable data grids
- Statistical Overview: Comprehensive fundamental analysis including P/E ratios, EPS, market cap, dividend yields, and 50+ financial metrics
- Company Profiles: Detailed company descriptions and sector information

### **News & Sentiment**
- Real-time News Feed: Latest news articles filtered by stock ticker
- Sentiment Analysis: AI-powered sentiment scoring for each news article (positive, neutral, negative)
- Topic Categorization: Automatic classification of news by relevance and topic

### **AI-Powered Insights**
- Intelligent Analysis: GPT-powered analysis of recent news articles to generate actionable insights
- Positive & Negative Highlights: Structured breakdown of bullish and bearish factors
- Market Outlook Summary: Concise summary of overall market sentiment and trends

## 🛠️ **Key Technologies & Dependencies**

### **Frontend**
- React 19.1.1: Modern UI library with hooks and functional components
- Redux Toolkit & Redux Persist: State management with persistence across sessions
- React Router DOM: Client-side routing and navigation
- Material-UI (MUI): Professional UI components including data grids, icons, and charts
    - @mui/material: Core component library
    - @mui/x-charts: Advanced charting components
    - @mui/x-data-grid: High-performance data tables
- Recharts: Additional charting library for custom visualizations
- Tailwind CSS: Utility-first CSS framework for responsive design
- Socket.io Client: Real-time WebSocket communication
- Vite: Fast build tool and development server

### **Backend**

- Express.js: Web application framework for Node.js
- MongoDB & Mongoose: NoSQL database and ODM for data persistence
- Socket.io: Real-time bidirectional event-based communication
- LangChain: AI orchestration framework
    - @langchain/openai: OpenAI integration for GPT models
    - @langchain/core: Core LangChain functionality
- JWT (jsonwebtoken): Secure authentication and authorization
- bcrypt: Password hashing and security
- dotenv: Environment variable management
- cookie-parser: HTTP cookie parsing middleware

### **External APIs**

- Twelve Data API: Real-time and historical stock market data
- Alpha Vantage API: Market data, news, and fundamental analysis
- OpenAI API: GPT-5 powered AI insights and analysis
- Article Extractor: Web scraping for news article content

## 📁 **Project Structure**
```bash
├── backend/
│   ├── controllers/      # Business logic and API handlers
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions and data generators
│   ├── db/              # Database connection
│   ├── socket/          # WebSocket handlers
│   └── server.js        # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main application component
│   │   └── main.jsx     # Application bootstrap
│   ├── components/      # Reusable UI components
│   │   ├── Chart.jsx
│   │   ├── GLCard.jsx
│   │   ├── Watchlist.jsx
│   │   ├── StatisticsCard.jsx
│   │   └── ...
│   ├── scenes/          # Page-level components
│   │   ├── Dashboard.jsx
│   │   ├── MarketWatch.jsx
│   │   ├── Analysis.jsx
│   │   ├── News.jsx
│   │   └── Insights.jsx
│   ├── state/           # Redux store configuration
│   └── context/         # React context providers
```
## 🚀 **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB instance
- API keys for Twelve Data, Alpha Vantage, and OpenAI

### **Installation**
1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```
2. **Install backend dependencies**
```
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
```

4. **Configure environment variables**
Create a .env file in the backend directory:
```bash
PORT=3535
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
TWELVE_DATA_API_KEY=<your-twelve-data-api-key>
ALPHA_VANTAGE_API_KEY=<your-alpha-vantage-api-key>
OPENAI_API_KEY=<your-openai-api-key>
```

5. **Run the application**
Backend:
```bash
cd backend
npm run dev
```
Frontend:
```bash
cd frontend
npm run dev
```

6. **Access the application**
    - Frontend: http://localhost:3000
    - Backend API: http://localhost:3535

## 🎯 **Core Functionality**
**Data Endpoints**
- /api/data/quoteData/:ticker - Real-time stock quotes
- /api/data/chartData/:ticker/:time - Historical price data
- /api/data/gainerslosers - Top market movers
- /api/data/news/:ticker - Stock-specific news feed
- /api/data/overview/:ticker - Company fundamentals
- /api/data/insights/:ticker - AI-generated insights
- /api/data/watchlist - Batch quote data for watchlist

## 🔐 **Security Features**
- JWT-based authentication
- HTTP-only cookies for session management
- Password hashing with bcrypt
- CORS configuration for cross-origin requests

## 📱 **Responsive Design**
The application is fully responsive and optimized for desktop, tablet, and mobile devices using Tailwind CSS utility classes and flexbox/grid layouts.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

📄 License
This project is licensed under the ISC License.

---
*Built with ❤️ using React, Node.js, and AI*
