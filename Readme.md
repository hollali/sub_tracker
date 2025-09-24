# 💳 Subscription Tracking System

<div align="center">

![Subscription Tracker](https://img.shields.io/badge/Subscription-Tracker-blue?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

**A powerful Node.js-based subscription management system built with MongoDB for tracking and managing recurring subscriptions, billing cycles, and customer data.**

</div>

---

## 🛠️ Tech Stack

<div align="center">

### Backend & Database
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
<img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />

### Authentication & Security
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
<img src="https://img.shields.io/badge/bcrypt-003A70?style=for-the-badge" alt="bcrypt" />

### Payment & Email
<img src="https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
<img src="https://img.shields.io/badge/Nodemailer-339933?style=for-the-badge" alt="Nodemailer" />

### Testing & Tools
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier" />

### Deployment
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
<img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white" alt="PM2" />
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🔧 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📖 Usage](#-usage)
- [🔌 API Endpoints](#-api-endpoints)
- [🗄️ Database Schema](#️-database-schema)
- [📁 Project Structure](#-project-structure)
- [🧪 Testing](#-testing)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

<div align="center">

| Feature | Description | Status |
|---------|-------------|--------|
| 🔐 **Authentication** | JWT-based secure authentication | ✅ |
| 👥 **Customer Management** | Complete customer profile management | ✅ |
| 📋 **Subscription Plans** | Flexible plan creation and management | ✅ |
| 💳 **Payment Processing** | Stripe integration for secure payments | ✅ |
| 📧 **Email Notifications** | Automated billing and renewal emails | ✅ |
| 📊 **Analytics Dashboard** | Revenue and subscription metrics | ✅ |
| 🔄 **Billing Cycles** | Automated recurring billing | ✅ |
| 🛡️ **Data Validation** | Comprehensive input validation | ✅ |

</div>

---

## 🔧 Prerequisites

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-v16.0.0+-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-v8.0.0+-CB3837?style=flat-square&logo=npm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4+-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/Git-Latest-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 🚀 Installation

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/hollali/sub_tracker.git
cd sub_traker

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env
# Edit .env with your configuration

# 4. Start MongoDB
mongod

# 5. Run the application
npm run dev
```

<div align="center">

🎉 **Your server is now running at `http://localhost:3000`**

</div>

---

## ⚙️ Configuration

Create a `.env` file with the following configuration:

```env
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🖥️ Server Configuration
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PORT=3000
NODE_ENV=development

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🗄️ Database
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MONGODB_URI=mongodb://localhost:27017/subscription_tracker
DB_NAME=subscription_tracker

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🔐 JWT Authentication
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 📧 Email Configuration
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 💳 Payment Gateway (Stripe)
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 🔄 Redis (Optional - for caching)
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REDIS_URL=redis://localhost:6379

#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 📝 Logging
#━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOG_LEVEL=info
```

---

## 📖 Usage

### 🎯 Quick API Examples

<details>
<summary><b>🔐 Authentication</b></summary>

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123",
    "name": "John Doe"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```
</details>

<details>
<summary><b>💳 Create Subscription</b></summary>

```bash
curl -X POST http://localhost:3000/api/subscriptions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "planId": "64f1a2b3c4d5e6f7a8b9c0d1",
    "customerId": "64f1a2b3c4d5e6f7a8b9c0d2"
  }'
```
</details>

---

## 🔌 API Endpoints

<div align="center">

### 🔐 Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | User login | ❌ |
| `POST` | `/api/auth/logout` | User logout | ✅ |
| `GET` | `/api/auth/me` | Get current user | ✅ |

### 👥 Customer Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/customers` | List all customers | ✅ |
| `POST` | `/api/customers` | Create new customer | ✅ |
| `GET` | `/api/customers/:id` | Get customer by ID | ✅ |
| `PUT` | `/api/customers/:id` | Update customer | ✅ |
| `DELETE` | `/api/customers/:id` | Delete customer | ✅ |

### 📋 Subscription Plans
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/plans` | List all plans | ❌ |
| `POST` | `/api/plans` | Create new plan | ✅ |
| `GET` | `/api/plans/:id` | Get plan by ID | ❌ |
| `PUT` | `/api/plans/:id` | Update plan | ✅ |
| `DELETE` | `/api/plans/:id` | Delete plan | ✅ |

### 💳 Subscriptions
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/subscriptions` | List subscriptions | ✅ |
| `POST` | `/api/subscriptions` | Create subscription | ✅ |
| `GET` | `/api/subscriptions/:id` | Get subscription | ✅ |
| `PUT` | `/api/subscriptions/:id` | Update subscription | ✅ |
| `POST` | `/api/subscriptions/:id/cancel` | Cancel subscription | ✅ |
| `POST` | `/api/subscriptions/:id/reactivate` | Reactivate subscription | ✅ |

### 📊 Analytics
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/analytics/revenue` | Revenue analytics | ✅ |
| `GET` | `/api/analytics/subscriptions` | Subscription metrics | ✅ |
| `GET` | `/api/analytics/churn` | Churn rate analysis | ✅ |

</div>

---

## 🗄️ Database Schema

### 👤 User Schema
```javascript
{
  _id: ObjectId,
  name: String,                    // Full name
  email: String,                   // Unique email
  password: String,                // Hashed password
  role: String,                    // 'admin' | 'user'
  avatar: String,                  // Profile picture URL
  isEmailVerified: Boolean,        // Email verification status
  lastLoginAt: Date,               // Last login timestamp
  createdAt: Date,
  updatedAt: Date
}
```

### 🏢 Customer Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  dateOfBirth: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentMethods: [{
    type: String,                  // 'card' | 'bank'
    provider: String,              // 'stripe' | 'paypal'
    details: Object,               // Encrypted payment details
    isDefault: Boolean,
    createdAt: Date
  }],
  metadata: Object,                // Custom fields
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 📋 Subscription Plan Schema
```javascript
{
  _id: ObjectId,
  name: String,                    // Plan name
  description: String,             // Plan description
  price: Number,                   // Price in cents
  currency: String,                // 'USD', 'EUR', etc.
  interval: String,                // 'monthly' | 'yearly' | 'weekly'
  intervalCount: Number,           // Billing frequency
  trialPeriodDays: Number,         // Trial period length
  setupFee: Number,                // One-time setup fee
  features: [String],              // List of features
  maxUsers: Number,                // User limit
  maxStorage: Number,              // Storage limit in GB
  isActive: Boolean,               // Plan availability
  sortOrder: Number,               // Display order
  metadata: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### 💳 Subscription Schema
```javascript
{
  _id: ObjectId,
  customerId: ObjectId,            // Reference to Customer
  planId: ObjectId,                // Reference to Plan
  status: String,                  // 'active' | 'cancelled' | 'past_due' | 'trial' | 'incomplete'
  currentPeriodStart: Date,        // Current billing period start
  currentPeriodEnd: Date,          // Current billing period end
  trialStart: Date,                // Trial start date
  trialEnd: Date,                  // Trial end date
  cancelledAt: Date,               // Cancellation date
  cancelAtPeriodEnd: Boolean,      // Cancel at end of period
  startDate: Date,                 // Subscription start
  endDate: Date,                   // Subscription end
  paymentMethod: String,           // Payment method ID
  discountId: ObjectId,            // Applied discount
  taxRate: Number,                 // Tax rate applied
  metadata: Object,                // Custom fields
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📁 Project Structure

```
📦 subscription-tracking-system/
├── 📂 src/
│   ├── 📂 controllers/           # Request handlers
│   │   ├── 📄 authController.js
│   │   ├── 📄 customerController.js
│   │   ├── 📄 planController.js
│   │   ├── 📄 subscriptionController.js
│   │   └── 📄 analyticsController.js
│   ├── 📂 models/               # Database models
│   │   ├── 📄 User.js
│   │   ├── 📄 Customer.js
│   │   ├── 📄 Plan.js
│   │   ├── 📄 Subscription.js
│   │   └── 📄 Invoice.js
│   ├── 📂 routes/               # API routes
│   │   ├── 📄 auth.js
│   │   ├── 📄 customers.js
│   │   ├── 📄 plans.js
│   │   ├── 📄 subscriptions.js
│   │   └── 📄 analytics.js
│   ├── 📂 middleware/           # Custom middleware
│   │   ├── 📄 auth.js
│   │   ├── 📄 validation.js
│   │   ├── 📄 errorHandler.js
│   │   ├── 📄 rateLimiting.js
│   │   └── 📄 logging.js
│   ├── 📂 services/             # Business logic
│   │   ├── 📄 emailService.js
│   │   ├── 📄 paymentService.js
│   │   ├── 📄 billingService.js
│   │   ├── 📄 notificationService.js
│   │   └── 📄 analyticsService.js
│   ├── 📂 utils/                # Helper utilities
│   │   ├── 📄 database.js
│   │   ├── 📄 logger.js
│   │   ├── 📄 helpers.js
│   │   ├── 📄 validators.js
│   │   └── 📄 constants.js
│   └── 📄 app.js                # Express app setup
├── 📂 tests/                    # Test files
│   ├── 📂 unit/
│   ├── 📂 integration/
│   ├── 📂 fixtures/
│   └── 📄 setup.js
├── 📂 docs/                     # Documentation
├── 📂 scripts/                  # Utility scripts
├── 📂 config/                   # Configuration files
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 package.json
├── 📄 README.md
├── 📄 Dockerfile
├── 📄 docker-compose.yml
├── 📄 ecosystem.config.js       # PM2 config
└── 📄 server.js                 # Entry point
```

---

## 🧪 Testing

<div align="center">

![Jest](https://img.shields.io/badge/Testing-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Coverage](https://img.shields.io/badge/Coverage-90%25-brightgreen?style=for-the-badge)

</div>

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run integration tests only
npm run test:integration

# Run unit tests only
npm run test:unit
```

### 📊 Test Coverage Goals
- **Unit Tests**: 90%+ coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: Critical user flows

---

## 🚀 Deployment

### 🐳 Docker Deployment

```bash
# Build and run with Docker
docker build -t subscription-tracker .
docker run -d -p 3000:3000 --name subscription-app subscription-tracker

# Or use Docker Compose
docker-compose up -d
```

### ⚡ PM2 Deployment (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start ecosystem.config.js

# Monitor processes
pm2 monit

# View logs
pm2 logs subscription-tracker
```

### ☁️ Cloud Deployment

<div align="center">

[![Deploy to Heroku](https://img.shields.io/badge/Deploy%20to-Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://heroku.com/deploy)
[![Deploy to Railway](https://img.shields.io/badge/Deploy%20to-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app)
[![Deploy to DigitalOcean](https://img.shields.io/badge/Deploy%20to-DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white)](https://digitalocean.com)

</div>

---

## 🔧 Available Scripts

| Script | Description | Usage |
|--------|-------------|-------|
| `npm start` | Start production server | Production |
| `npm run dev` | Start development server with nodemon | Development |
| `npm test` | Run complete test suite | Testing |
| `npm run lint` | Run ESLint code analysis | Code Quality |
| `npm run format` | Format code with Prettier | Code Formatting |
| `npm run migrate` | Run database migrations | Database |
| `npm run seed` | Seed database with sample data | Development |
| `npm run build` | Build production bundle | Production |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### 🚀 Quick Contribution Guide

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### 📋 Development Guidelines

- ✅ Follow existing code style
- ✅ Write comprehensive tests
- ✅ Update documentation
- ✅ Ensure all tests pass
- ✅ Follow semantic commit messages

---

## 📈 Roadmap

- [ ] **GraphQL API** - Alternative to REST API
- [ ] **Multi-tenancy** - Support for multiple organizations
- [ ] **Advanced Analytics** - ML-powered insights
- [ ] **Mobile App** - React Native companion app
- [ ] **Webhooks** - Event-driven integrations
- [ ] **API Rate Limiting** - Enhanced security features

---

## 📄 License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**This project is licensed under the MIT License**

See the [LICENSE](LICENSE) file for details.

</div>

---

## 🆘 Support & Community

<div align="center">

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/yourusername/subscription-tracking-system/issues)
[![Discussions](https://img.shields.io/badge/GitHub-Discussions-blue?style=for-the-badge&logo=github)](https://github.com/yourusername/subscription-tracking-system/discussions)
[![Discord](https://img.shields.io/badge/Discord-Community-7289da?style=for-the-badge&logo=discord)](https://discord.gg/your-server)

**Need help?** Join our community or reach out!

📧 **Email**: support@dheztinykartel@gmail.com  
💬 **Discord**: [Join our server](https://discord.gg/your-server)  
📖 **Documentation**: [Full Documentation](docs/)  
🐛 **Bug Reports**: [GitHub Issues](https://github.com/hollali/sub_tracker/issues)

</div>

---

## 🔗 Related Resources

<div align="center">

| Resource | Description | Link |
|----------|-------------|------|
| 📚 **API Documentation** | Comprehensive API guide | [docs/api.md](docs/api.md) |
| 🗄️ **Database Schema** | Complete schema documentation | [docs/schema.md](docs/schema.md) |
| 🚀 **Deployment Guide** | Production deployment guide | [docs/deployment.md](docs/deployment.md) |
| 🔧 **Troubleshooting** | Common issues and solutions | [docs/troubleshooting.md](docs/troubleshooting.md) |
| 🎯 **Best Practices** | Development best practices | [docs/best-practices.md](docs/best-practices.md) |

</div>

---

<div align="center">

**⭐ Star this repository if it helped you!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/subscription-tracking-system.svg?style=social&label=Star)](https://github.com/yourusername/subscription-tracking-system)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/subscription-tracking-system.svg?style=social&label=Fork)](https://github.com/yourusername/subscription-tracking-system/fork)

**Made with ❤️ by the development team**

</div>
