# Hono-2 API

> A production-ready REST API built with **Hono** framework on **Vercel** serverless, featuring comprehensive integrations with Swagger documentation, Telegram bot messaging, and MongoDB database operations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Milad93R/hono-2)

## 🚀 Features

### Core Features
- 🔐 **API Key Authentication** - Secure endpoint access with API keys
- 📚 **Swagger UI** - Interactive API documentation (publicly accessible)
- 🐛 **Debug Logging** - Advanced debugging with secret header
- 📊 **Request Monitoring** - Track request duration and metadata
- ⚡ **Global Error Handling** - Comprehensive error management

### Integrations
- 💬 **Telegram Bot** - Send messages and logs to Telegram groups
- 🗄️ **MongoDB** - Full CRUD operations with MongoDB Atlas
- 📝 **OpenAPI 3.0** - Complete API specification

## 🔗 Live Demo

- **Production App**: https://hono-2-lovat.vercel.app
- **Swagger Docs**: https://hono-2-lovat.vercel.app/docs
- **OpenAPI Spec**: https://hono-2-lovat.vercel.app/openapi.json

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Milad93R/hono-2.git
cd hono-2

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your credentials
```

## ⚙️ Environment Variables

```env
# API Authentication
API_KEY=your-api-key-here

# Debug Secret (for detailed error logs)
DEBUG_SECRET=your-debug-secret

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-telegram-bot-token

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## 🏃 Development

```bash
# Run locally with Vercel dev server
npm run dev

# Build (not required for Vercel)
npm run build

# Deploy to Vercel production
npm run deploy
```

## 📚 API Endpoints

### General Endpoints (No Auth)
- `GET /` - API welcome message
- `GET /docs` - Swagger UI documentation
- `GET /openapi.json` - OpenAPI specification
- `GET /debug-env` - Environment debug info

### Test Endpoints (Requires API Key)
- `GET /api/test/error` - Trigger test error

### Telegram Endpoints (Requires API Key)
- `POST /api/telegram/send` - Send message to threads
- `POST /api/telegram/log` - Send formatted log
- `GET /api/telegram/threads` - Get thread IDs

### MongoDB Endpoints (Requires API Key)
- `GET /api/mongodb/collections` - List all collections
- `GET /api/mongodb/:collection` - Get all documents
- `GET /api/mongodb/:collection/:id` - Get document by ID
- `POST /api/mongodb/:collection` - Create new document
- `PUT /api/mongodb/:collection/:id` - Update document
- `DELETE /api/mongodb/:collection/:id` - Delete document
- `POST /api/mongodb/:collection/query` - Custom query

## 💡 Usage Examples

### Standard API Call
```bash
curl -H "X-API-Key: your-api-key" \
  https://your-app.vercel.app/api/test/error
```

### Debug Mode (with logs)
```bash
curl -H "X-API-Key: your-api-key" \
     -H "X-Debug-Secret: your-debug-secret" \
  https://your-app.vercel.app/api/test/error
```

### Send Telegram Message
```bash
curl -X POST "https://your-app.vercel.app/api/telegram/send" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello from API!"}'
```

### MongoDB - Create Document
```bash
curl -X POST "https://your-app.vercel.app/api/mongodb/users" \
  -H "X-API-Key: your-api-key" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### MongoDB - Get Documents
```bash
curl -X GET "https://your-app.vercel.app/api/mongodb/users" \
  -H "X-API-Key: your-api-key"
```

## 📁 Project Structure

```
hono-2/
├── api/
│   └── index.ts                    # Vercel serverless entry
├── src/
│   ├── config/
│   │   ├── openapi.config.ts       # OpenAPI specification
│   │   └── telegram.config.ts      # Telegram configuration
│   ├── controllers/
│   │   ├── docs.controller.ts      # Documentation endpoints
│   │   ├── test.controller.ts      # Test endpoints
│   │   ├── telegram.controller.ts  # Telegram endpoints
│   │   └── mongodb.controller.ts   # MongoDB endpoints
│   ├── services/
│   │   ├── telegram.service.ts     # Telegram bot service
│   │   └── mongodb.service.ts      # MongoDB service
│   ├── middleware/
│   │   ├── auth.middleware.ts      # Authentication
│   │   ├── debug.middleware.ts     # Debug logging
│   │   └── monitoring.middleware.ts # Request monitoring
│   ├── handlers/
│   │   └── error.handler.ts        # Error handling
│   ├── routes/
│   │   └── index.ts                # Route registration
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── index.ts                    # Main app
├── .env.example                    # Environment template
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
└── vercel.json                     # Vercel config
```

## 🚢 Deployment to Vercel

### Option 1: Deploy Button
Click the "Deploy with Vercel" button at the top of this README.

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 3: GitHub Integration
1. Push to GitHub
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

### Setting Environment Variables in Vercel

```bash
# Using Vercel CLI
echo "your-api-key" | vercel env add API_KEY production
echo "your-debug-secret" | vercel env add DEBUG_SECRET production
echo "your-telegram-bot-token" | vercel env add TELEGRAM_BOT_TOKEN production
echo "your-mongodb-uri" | vercel env add MONGODB_URI production
```

Or via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for production/preview/development

## 📖 Documentation

Detailed documentation available in the repository:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide with testing
- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[TELEGRAM_SETUP.md](TELEGRAM_SETUP.md)** - Telegram integration guide
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - MongoDB setup and usage
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview

## 🛠️ Tech Stack

- **[Hono](https://hono.dev/)** v4.10.3 - Ultra-fast web framework
- **[TypeScript](https://www.typescriptlang.org/)** v5.8.3 - Type safety
- **[MongoDB](https://www.mongodb.com/)** v6.20.0 - Database
- **[Vercel](https://vercel.com/)** - Serverless deployment
- **[@hono/swagger-ui](https://github.com/honojs/middleware)** v0.5.2 - API docs

## 🔒 Security

- API key authentication on all protected endpoints
- Environment variables for sensitive data
- Input validation and sanitization
- Proper error handling without exposing internals
- Debug mode requires secret header

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

ISC

## 👤 Author

**Milad93R**

- GitHub: [@Milad93R](https://github.com/Milad93R)
- Repository: [hono-2](https://github.com/Milad93R/hono-2)

## ⭐ Acknowledgments

- Built with [Hono](https://hono.dev/)
- Deployed on [Vercel](https://vercel.com/)
- Inspired by modern API design patterns

---

**Made with ❤️ using Hono and Vercel**
