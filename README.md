# Hono-2 API

> A production-ready REST API built with **Hono** framework on **Vercel** serverless, featuring comprehensive integrations with Swagger documentation, Telegram bot messaging, and MongoDB database operations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Milad93R/hono-2)

## 🚀 Features

### 🔐 Authentication & Security
- **API Key Authentication** - Secure endpoint access with `X-API-Key` header
- **Swagger UI Basic Auth** - Protected Swagger documentation with username/password
- **Debug Secret Header** - Enhanced error logging with `X-Debug-Secret` header
- **Environment Variable Protection** - Automatic trimming to prevent hidden character issues
- **Input Validation** - Proper sanitization and validation on all endpoints

### 📚 Documentation & API
- **Interactive Swagger UI** - Complete API documentation with try-it-out functionality
- **OpenAPI 3.0 Specification** - Standard-compliant API specification
- **Persistent Authorization** - Swagger UI remembers your API key after authorization
- **Multiple Server URLs** - Dynamic server configuration (production, deployment, custom domain, local)
- **Deep Linking** - Direct links to specific endpoints in Swagger UI
- **Request Duration Display** - See how long each request takes
- **Filtering & Search** - Easy endpoint discovery in Swagger UI

### 🐛 Debugging & Monitoring
- **Debug Logging Middleware** - Captures and includes console logs in API responses
- **Request Monitoring** - Tracks request duration, method, path, status, user agent, and IP address
- **Global Error Handling** - Comprehensive error management with detailed error messages
- **Environment Debug Endpoint** - Check environment variable configuration (`/debug-env`)
- **Console Log Capture** - All console logs included in debug mode responses

### 💬 Telegram Integration
- **Send Messages** - Send messages to Telegram threads/groups via Bot API
- **Formatted Logs** - Send structured log messages with level indicators (INFO, WARN, ERROR)
- **Thread Management** - Support for multiple thread IDs for organized messaging
- **Logger Utility** - Unified logging system that logs to console and Telegram
- **Automatic Notifications** - Optional Telegram notifications for important events

### 🗄️ MongoDB Integration
- **Full CRUD Operations** - Create, Read, Update, Delete documents
- **Collection Management** - List all collections in database
- **Document Retrieval** - Get all documents or by specific ID
- **Custom Queries** - Advanced querying with MongoDB query syntax
- **Connection Pooling** - Efficient database connection management
- **Error Handling** - Graceful error handling for database operations

### 🌐 Development Features
- **Hot Reload** - Automatic server restart on code changes using `tsx watch`
- **Local Development Server** - Run on `http://localhost:3072` with dotenv support
- **CORS Middleware** - Cross-Origin Resource Sharing for local development
- **TypeScript** - Full type safety with comprehensive type definitions
- **Environment Variables** - Easy configuration via `.env` file

### 🚀 Deployment & Infrastructure
- **Vercel Serverless** - Zero-config serverless deployment on Vercel
- **GitHub Actions CI/CD** - Automatic deployment on push to `main` branch
- **Custom Domain Support** - Configure custom domains (e.g., `hono2.rashidikhah.com`)
- **Multiple Runtime Support** - Run on Node.js, Cloudflare Workers, Deno, Bun, and more
- **Edge Computing** - Deploy to edge locations for low latency
- **Environment Variable Management** - Secure secrets management via Vercel dashboard or CLI

### 🏗️ Architecture & Performance
- **Modular Architecture** - Clean separation of concerns (controllers, services, middleware, handlers)
- **Middleware Pipeline** - Request processing through CORS, logging, monitoring, and authentication
- **Service Layer Pattern** - Reusable services for Telegram and MongoDB operations
- **Type-Safe Context** - TypeScript bindings for environment variables and context
- **Error Handler** - Centralized error handling with stack traces in debug mode

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

# Swagger UI Authentication (Basic Auth)
SWAGGER_USERNAME=admin
SWAGGER_PASSWORD=admin123

# Debug Secret (for detailed error logs)
DEBUG_SECRET=your-debug-secret

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your-telegram-bot-token

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Custom Domain (optional, for OpenAPI servers list)
CUSTOM_DOMAIN=hono2.yourdomain.com
```

## 🏃 Development

```bash
# Run locally with hot reload (watches for changes)
# Server runs on http://localhost:3072
npm run dev

# Build (not required for Vercel)
npm run build

# Deploy to Vercel production
npm run deploy
```

### Local Development Features
- **Hot Reload**: Automatic server restart on file changes using `tsx watch`
- **Port**: Runs on `http://localhost:3072` by default
- **Environment Variables**: Loaded from `.env` file automatically
- **CORS Enabled**: Allows cross-origin requests for local testing
- **Debug Mode**: Use `X-Debug-Secret` header to see detailed logs in responses

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
│   └── index.ts                    # Vercel serverless entry point
├── src/
│   ├── config/
│   │   └── openapi.config.ts       # OpenAPI 3.0 specification with dynamic servers
│   ├── controllers/
│   │   ├── docs.controller.ts      # Swagger UI and OpenAPI endpoints
│   │   ├── test.controller.ts      # Test and debugging endpoints
│   │   ├── telegram.controller.ts  # Telegram messaging endpoints
│   │   └── mongodb.controller.ts   # MongoDB CRUD endpoints
│   ├── services/
│   │   ├── telegram.service.ts     # Telegram Bot API integration
│   │   └── mongodb.service.ts      # MongoDB connection and operations
│   ├── middleware/
│   │   ├── auth.middleware.ts      # API key & Swagger Basic Auth
│   │   ├── cors.middleware.ts      # CORS headers for cross-origin requests
│   │   ├── debug.middleware.ts     # Console log capture and debug mode
│   │   └── monitoring.middleware.ts # Request metrics and logging
│   ├── handlers/
│   │   └── error.handler.ts        # Global error handler
│   ├── routes/
│   │   └── index.ts                # Route registration and setup
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   ├── utils/
│   │   └── logger.ts               # Unified logger (console + Telegram)
│   └── index.ts                    # Main Hono app setup
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD workflow
├── dev-server.ts                   # Local development server with hot reload
├── .env.example                    # Environment variables template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── vercel.json                     # Vercel deployment configuration
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
echo "admin" | vercel env add SWAGGER_USERNAME production
echo "admin123" | vercel env add SWAGGER_PASSWORD production
echo "your-debug-secret" | vercel env add DEBUG_SECRET production
echo "your-telegram-bot-token" | vercel env add TELEGRAM_BOT_TOKEN production
echo "your-mongodb-uri" | vercel env add MONGODB_URI production
echo "hono2.yourdomain.com" | vercel env add CUSTOM_DOMAIN production
```

Or via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable for production/preview/development

### GitHub Actions CI/CD

The project includes automated deployment via GitHub Actions:
- **Trigger**: Automatic deployment on push to `main` branch
- **Workflow**: `.github/workflows/deploy.yml`
- **Secrets Required**: `VERCEL_TOKEN` in GitHub secrets
- **Process**: Pulls Vercel config → Builds → Deploys to production

To set up:
```bash
# Add Vercel token to GitHub secrets
gh secret set VERCEL_TOKEN --body "your-vercel-token"
```

## 📖 API Documentation

### Interactive Documentation
- **Swagger UI**: Available at `/docs` (requires Basic Auth)
- **OpenAPI Spec**: Available at `/openapi.json` (public)
- **Try It Out**: Test endpoints directly from Swagger UI
- **Persistent Auth**: API keys are saved in browser for convenience

### Accessing Swagger UI
1. Navigate to `https://your-app.vercel.app/docs`
2. Enter Swagger username and password when prompted
3. Click "Authorize" and enter your `API_KEY`
4. Explore and test all available endpoints

## 🛠️ Tech Stack

### Core Framework
- **[Hono](https://hono.dev/)** v4.10.3 - Ultra-fast web framework with multiple runtime support
- **[TypeScript](https://www.typescriptlang.org/)** v5.8.3 - Full type safety and modern JavaScript features
- **[@hono/node-server](https://github.com/honojs/hono/tree/main/packages/node-server)** v1.19.5 - Node.js adapter for Hono

### Database & Services
- **[MongoDB](https://www.mongodb.com/)** v6.20.0 - NoSQL database with Atlas cloud support
- **Telegram Bot API** - Messaging and notification service

### Development Tools
- **[tsx](https://github.com/esbuild-kit/tsx)** v4.7.1 - TypeScript execution with hot reload
- **[dotenv](https://github.com/motdotla/dotenv)** v17.2.3 - Environment variable management

### Deployment & Infrastructure
- **[Vercel](https://vercel.com/)** - Serverless deployment platform with edge computing
- **GitHub Actions** - Continuous Integration and Deployment

### Key Features
- **Edge Computing**: Deploy to edge locations for low latency
- **Multiple Runtime Support**: Run on Node.js, Cloudflare Workers, Deno, Bun, and more
- **Serverless**: Auto-scaling with zero server management
- **Type-Safe**: Full TypeScript support with strict type checking

## 🔒 Security

### Authentication & Authorization
- **API Key Authentication**: Required on all protected endpoints via `X-API-Key` header
- **Swagger UI Protection**: Basic Authentication (username/password) for documentation access
- **Debug Secret**: Separate secret header (`X-Debug-Secret`) required for detailed error logs

### Data Protection
- **Environment Variables**: All secrets stored securely in environment variables
- **Input Validation**: Proper sanitization and validation on all endpoints
- **Error Handling**: Error messages don't expose internal implementation details
- **Hidden Character Protection**: Automatic trimming of environment variables to prevent parsing issues

### Best Practices
- Never commit `.env` files (included in `.gitignore`)
- Use strong, unique API keys and secrets
- Rotate credentials regularly
- Monitor access logs and request patterns

## ✨ Key Advantages

### Why Hono?
- **⚡ Ultra-Fast**: Built for performance, one of the fastest web frameworks
- **🌍 Multiple Runtime Support**: Deploy anywhere (Vercel, Cloudflare, AWS, Deno, Bun)
- **📦 Small Bundle Size**: Minimal dependencies, optimized for edge computing
- **🔒 Type-Safe**: Full TypeScript support with excellent DX
- **🚀 Edge-Ready**: Designed for edge computing and serverless environments

### Why This Project?
- **🔧 Production-Ready**: Comprehensive features out of the box
- **📚 Well-Documented**: Complete OpenAPI specification with Swagger UI
- **🔐 Secure**: Multiple layers of authentication and validation
- **🐛 Developer-Friendly**: Hot reload, debug mode, and detailed error handling
- **🚢 Easy Deployment**: One-click deployment to Vercel with CI/CD
- **🔌 Extensible**: Clean architecture makes it easy to add new features

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
