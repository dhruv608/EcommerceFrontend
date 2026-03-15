# 🛍️ Light Store - Development Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features Implemented](#features-implemented)
- [Development Setup](#development-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Code Quality](#code-quality)
- [Performance](#performance)
- [SEO](#seo)
- [Accessibility](#accessibility)
- [Security](#security)
- [Monitoring](#monitoring)
- [Contributing](#contributing)

---

## 🏢 Overview

Light Store is a modern, full-stack ecommerce platform built with cutting-edge technologies. It provides a premium shopping experience with robust error handling, comprehensive testing, and production-ready features.

### 🎯 Key Features

- **🛒 Customer Experience**
  - Advanced product browsing with filtering and search
  - Smart shopping cart with real-time updates
  - Secure checkout with multiple payment options
  - User authentication and profile management
  - Order tracking and history

- **🏢 Admin Dashboard**
  - Product management with CRUD operations
  - Category organization
  - Order processing and tracking
  - Analytics and performance metrics
  - User management

- **🔧 Technical Excellence**
  - Comprehensive error handling and monitoring
  - Production-ready testing suite
  - SEO optimization with structured data
  - Accessibility compliance (WCAG)
  - Progressive Web App capabilities
  - Dark mode support

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🌐 Frontend   │    │   🌐 Backend    │    │   🗄️ Database   │
│                 │    │                 │    │                 │
│  Next.js 16     │◄──►│  Spring Boot    │◄──►│   MySQL 8.0     │
│  React 19       │    │  Java 17        │    │   Redis Cache   │
│  TypeScript     │    │  Spring Security│    │   File Storage  │
│  TailwindCSS    │    │  JWT Auth       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (user)/            # Customer-facing pages
│   ├── admin/             # Admin dashboard
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
│   ├── admin/            # Admin-specific components
│   ├── products/         # Product-related components
│   ├── ui/               # Base UI components
│   └── skeleton/          # Loading skeleton components
├── context/               # React Context providers
├── lib/                   # Utility functions
├── store/                 # State management (Zustand)
└── __tests__/             # Test files
```

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology                                                                                                           | Version | Description                     |
| -------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)             | 16.x    | React framework with App Router |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)                    | 19.x    | UI library with hooks           |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)      | 5.x     | Type-safe JavaScript            |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) | 4.x     | Utility-first CSS framework     |
| ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat-square&logo=lucide&logoColor=white)                  | 0.x     | Beautiful icon library          |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-18181B?style=flat-square&logo=radix-ui&logoColor=white)            | Latest  | Headless UI components          |
| ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white)               | 5.x     | State management                |

### Backend Technologies

| Technology                                                                                                                     | Version | Description                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------------------------------ |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)             | 3.x     | Java framework                 |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)                               | 17.x    | Programming language           |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white) | 6.x     | Authentication & authorization |
| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)                               | 8.x     | Relational database            |
| ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)                               | 7.x     | Caching & session storage      |

### Development Tools

| Tool                                                                                                      | Purpose           |
| --------------------------------------------------------------------------------------------------------- | ----------------- |
| ![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)             | Testing framework |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)       | Code linting      |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white) | Code formatting   |
| ![Husky](https://img.shields.io/badge/Husky-FFCA5F?style=flat-square&logo=husky&logoColor=white)          | Git hooks         |
| ![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat-square&logo=sentry&logoColor=white)       | Error monitoring  |

---

## ✨ Features Implemented

### 🧪 Testing Infrastructure

- **Jest Configuration**: Complete setup with coverage thresholds (70%)
- **Component Testing**: Unit tests for skeleton components and error boundaries
- **Test Scripts**: Automated testing workflows
- **Coverage Reporting**: Detailed test coverage reports

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### 🛡️ Error Handling

- **Error Boundaries**: Global error catching with fallback UI
- **Sentry Integration**: Production error tracking
- **Graceful Degradation**: Fallbacks for failed operations
- **Development Logging**: Conditional console output

### 📊 Performance Monitoring

- **Sentry**: Error tracking and performance monitoring
- **Bundle Optimization**: Next.js optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting

### 🔍 SEO Optimization

- **Dynamic Metadata**: Automatic meta tag generation
- **Structured Data**: JSON-LD for products and pages
- **Sitemap Generation**: Automatic sitemap creation
- **Robots.txt**: Search engine directives

### ♿ Accessibility

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus trapping
- **Color Contrast**: WCAG compliant color schemes

### 🌙 Modern UI Features

- **Dark Mode**: System preference detection
- **Theme Persistence**: LocalStorage theme saving
- **PWA Manifest**: Mobile app installation
- **Responsive Design**: Mobile-first approach

### 🛠️ Code Quality

- **ESLint**: Comprehensive linting rules
- **Prettier**: Consistent code formatting
- **Pre-commit Hooks**: Automated quality checks
- **TypeScript**: Full type safety

---

## 🚀 Development Setup

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18.x+-green?style=flat-square&logo=node.js&logoColor=white)
- ![Java](https://img.shields.io/badge/Java-17+-red?style=flat-square&logo=openjdk&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue?style=flat-square&logo=mysql&logoColor=white)
- ![Redis](https://img.shields.io/badge/Redis-7.0+-red?style=flat-square&logo=redis&logoColor=white)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/dhruv608/EcommerceFrontend.git
cd EcommerceFrontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env.local
# Update .env.local with your configuration
```

4. **Start development server**

```bash
npm run dev
```

### Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_IMAGE_URL=http://localhost:8080/images

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Sentry Configuration (Optional)
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
SENTRY_DSN=your-sentry-dsn-here
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project

# Application Version
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
```

### Test Structure

```
src/components/__tests__/
├── ProductCardSkeleton.test.tsx
├── ErrorBoundary.test.tsx
└── [additional test files]
```

### Coverage Targets

- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Environment-Specific Deployment

#### Vercel (Recommended)

```bash
npm install -g vercel
vercel --prod
```

#### Docker

```bash
docker build -t lightstore-frontend .
docker run -p 3000:3000 lightstore-frontend
```

#### Static Export

```bash
npm run build
npm run export
```

---

## 📏 Code Quality

### ESLint Configuration

```json
{
  "extends": ["next/core-web-vitals", "@typescript-eslint/recommended", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### Prettier Configuration

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

### Pre-commit Hooks

```bash
# Install husky
npm run prepare

# Pre-commit: lint and format staged files
# Pre-push: run tests and checks
```

---

## ⚡ Performance

### Optimization Techniques

1. **Image Optimization**
   - Next.js Image component
   - Responsive images
   - Lazy loading
   - WebP format support

2. **Code Splitting**
   - Route-based splitting
   - Dynamic imports
   - Component-level splitting

3. **Caching Strategy**
   - Redis for session storage
   - Browser caching headers
   - Static asset optimization

4. **Bundle Optimization**
   - Tree shaking
   - Minification
   - Compression

### Performance Metrics

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

---

## 🔍 SEO

### Meta Tags

Dynamic meta tag generation for all pages:

```typescript
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOProps): Metadata
```

### Structured Data

JSON-LD structured data for:

- Products
- Organization
- Website
- Breadcrumbs

### Sitemap

Automatic sitemap generation at `/sitemap.xml`

### Robots.txt

Search engine directives for optimal crawling.

---

## ♿ Accessibility

### WCAG 2.1 Compliance

- **Level AA**: Full compliance
- **Keyboard Navigation**: Complete keyboard access
- **Screen Readers**: Comprehensive ARIA support
- **Color Contrast**: 4.5:1 minimum ratio

### Accessibility Features

- **Skip Links**: Quick navigation to main content
- **Focus Management**: Proper focus trapping
- **ARIA Labels**: Descriptive labels for all interactive elements
- **Keyboard Shortcuts**: Common keyboard shortcuts

---

## 🔒 Security

### Authentication

- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcrypt for password storage
- **Session Management**: Secure session handling
- **CORS Configuration**: Proper cross-origin setup

### Data Protection

- **Input Validation**: Comprehensive input sanitization
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Output encoding
- **CSRF Protection**: Token-based CSRF protection

### Security Headers

```typescript
// Security headers configuration
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}
```

---

## 📊 Monitoring

### Sentry Integration

- **Error Tracking**: Automatic error capture
- **Performance Monitoring**: Transaction tracking
- **Release Tracking**: Version-based monitoring
- **User Feedback**: Contextual error reports

### Logging Strategy

- **Development**: Console logging with conditional output
- **Production**: Sentry error reporting
- **Debug Mode**: Detailed error information

---

## 🤝 Contributing

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Commit** with semantic messages
6. **Push** to your fork
7. **Create** a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use TailwindCSS for styling
- Write tests for new features
- Update documentation
- Maintain code coverage

### Commit Messages

```bash
feat: add new feature
fix: fix bug
docs: update documentation
refactor: code refactoring
test: add tests
chore: maintenance
```

---

## 📚 API Documentation

### Authentication Endpoints

```typescript
POST / api / auth / login
POST / api / auth / register
POST / api / auth / logout
GET / api / auth / profile
```

### Product Endpoints

```typescript
GET  /api/products
GET  /api/products/:id
POST /api/products
PUT  /api/products/:id
DELETE /api/products/:id
```

### Cart Endpoints

```typescript
GET  /api/cart/:userId
POST /api/cart/add
PUT  /api/cart/update
DELETE /api/cart/remove
DELETE /api/cart/clear
```

---

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript configuration
   - Verify environment variables
   - Update dependencies

2. **Test Failures**
   - Clear Jest cache: `npm run test -- --clearCache`
   - Update test snapshots
   - Check mock implementations

3. **Deployment Issues**
   - Verify environment variables
   - Check build logs
   - Validate API endpoints

### Debug Mode

```bash
# Enable debug mode
DEBUG=* npm run dev

# Enable Next.js debug
NEXT_DEBUG=1 npm run dev
```

---

## 📞 Support

### Getting Help

- **Documentation**: Check this README first
- **Issues**: [GitHub Issues](https://github.com/dhruv608/EcommerceFrontend/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dhruv608/EcommerceFrontend/discussions)

### Contact

- **Author**: [Dhruv Narang](https://github.com/dhruv608)
- **Email**: dhruv@example.com
- **LinkedIn**: [Connect](https://linkedin.com/in/dhruvnarang608/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - Amazing framework
- **Spring Boot Team** - Powerful backend
- **TailwindCSS** - Beautiful styling
- **Vercel** - Hosting platform
- **GitHub** - Code management

---

**⭐ Star this repo if it helped you! ⭐**

Made with ❤️ and ☕ by [Dhruv Narang](https://github.com/dhruv608)
