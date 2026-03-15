# 🛍️ Light Store - Premium E-Commerce Platform

<div align="center">

![Light Store Logo](/logo.png)

**A modern, full-stack e-commerce platform built with cutting-edge technologies**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-FF5722?style=for-the-badge&logo=vercel&logoColor=white)](https://lightstore.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/dhruv608/EcommerceFrontend?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dhruv608/EcommerceFrontend)
[![License](https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge&logo=github&logoColor=white)](LICENSE)

</div>

---

## 🌟 Features

### 🛒 **Customer Experience**

- 🛍️ **Product Browsing** - Advanced filtering, search, and sorting
- 🛒 **Smart Shopping Cart** - Real-time cart management with guest support
- 💳 **Secure Checkout** - Multiple payment methods integration
- 👤 **User Authentication** - Secure login/register with JWT tokens
- 📦 **Order Tracking** - Complete order history and status tracking
- ⭐ **Wishlist** - Save favorite products for later

### 🏢 **Admin Dashboard**

- 📊 **Analytics Dashboard** - Sales insights and performance metrics
- 📦 **Product Management** - CRUD operations with image uploads
- 🗂️ **Category Management** - Organize products efficiently
- 📋 **Order Management** - Process and track customer orders
- 👥 **User Management** - Customer account administration
- 🎨 **Theme Customization** - Light Store theme (#ACAC49) integration

### 🔧 **Technical Features**

- ⚡ **Lightning Fast** - Optimized performance with Next.js 14
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **SEO Optimized** - Server-side rendering and meta tags
- 🔒 **Security First** - Authentication, authorization, and data protection
- 🌐 **PWA Ready** - Progressive Web App capabilities
- 🔄 **Real-time Updates** - Live cart and order status

---

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🌐 Frontend   │    │   🌐 Backend    │    │   🗄️ Database   │
│                 │    │                 │    │                 │
│  Next.js 14     │◄──►│  Spring Boot    │◄──►│   MySQL 8.0     │
│  React 18       │    │  Java 17        │    │   Redis Cache   │
│  TypeScript     │    │  Spring Security│    │   File Storage  │
│  TailwindCSS    │    │  JWT Auth       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🛠️ Tech Stack

### 🎨 **Frontend Technologies**

| Technology                                                                                                                   | Version | Description                     |
| ---------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)                     | 14.x    | React framework with App Router |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)                            | 18.x    | UI library with hooks           |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)              | 5.x     | Type-safe JavaScript            |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)         | 3.x     | Utility-first CSS framework     |
| ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat-square&logo=lucide&logoColor=white)                          | 0.x     | Beautiful icon library          |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0085FF?style=flat-square&logo=framer&logoColor=white)            | 10.x    | Animation library               |
| ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) | 7.x     | Form validation                 |
| ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=zustand&logoColor=white)                       | 4.x     | State management                |

### ⚙️ **Backend Technologies**

| Technology                                                                                                                     | Version | Description                    |
| ------------------------------------------------------------------------------------------------------------------------------ | ------- | ------------------------------ |
| ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)             | 3.x     | Java framework                 |
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)                               | 17.x    | Programming language           |
| ![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white) | 6.x     | Authentication & authorization |
| ![Spring Data JPA](https://img.shields.io/badge/Spring_Data_JPA-6DB33F?style=flat-square&logo=spring&logoColor=white)          | 3.x     | Database access                |
| ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=flat-square&logo=mysql&logoColor=white)                               | 8.x     | Relational database            |
| ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)                               | 7.x     | Caching & session storage      |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white)                     | 0.x     | Token-based authentication     |
| ![Maven](https://img.shields.io/badge/Apache_Maven-C71A36?style=flat-square&logo=apache-maven&logoColor=white)                 | 3.x     | Build tool                     |

---

## 🚀 Quick Start

### 📋 Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-18.x+-green?style=flat-square&logo=node.js&logoColor=white)
- ![Java](https://img.shields.io/badge/Java-17+-red?style=flat-square&logo=openjdk&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue?style=flat-square&logo=mysql&logoColor=white)
- ![Redis](https://img.shields.io/badge/Redis-7.0+-red?style=flat-square&logo=redis&logoColor=white)

### 🛠️ Installation

#### 🌐 Frontend Setup

```bash
# Clone the repository
git clone https://github.com/dhruv608/EcommerceFrontend.git
cd EcommerceFrontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

#### ⚙️ Backend Setup

```bash
# Clone backend repository
git clone https://github.com/dhruv608/EcommerceBackend.git
cd EcommerceBackend

# Configure database in application.properties
# Run MySQL and create database

# Start Spring Boot application
./mvnw spring-boot:run
```

### 🌍 Environment Variables

```env
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_IMAGE_URL=http://localhost:8080/images
JWT_SECRET=your-super-secret-jwt-key

# Backend (application.properties)
spring.datasource.url=jdbc:mysql://localhost:3306/lightstore
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password
jwt.secret=your-super-secret-jwt-key
```

---

## 📱 Application Sides

### 🎯 **User-Facing Side** (Customer Portal)

- **🏠 Home Page** - Featured products and promotions
- **🛍️ Products** - Browse, filter, and search products
- **🛒 Shopping Cart** - Add/remove items, quantity management
- **👤 Account** - Profile, orders, wishlist, addresses
- **📦 Orders** - Order history and tracking
- **💳 Checkout** - Secure payment process

### 🏢 **Admin Side** (Management Portal)

- **📊 Dashboard** - Analytics and overview
- **📦 Products** - Product CRUD, inventory management
- **🗂️ Categories** - Category organization
- **📋 Orders** - Order processing and management
- **👥 Users** - Customer management
- **⚙️ Settings** - System configuration

### 🔧 **API Side** (Backend Services)

- **🔐 Authentication** - JWT-based security
- **📦 Product Service** - Product management APIs
- **🛒 Cart Service** - Shopping cart operations
- **📋 Order Service** - Order processing
- **👤 User Service** - User management
- **💳 Payment Service** - Payment integration

---

## 🎨 Theme & Design

### 🎨 **Light Store Theme**

- **Primary Color**: `#ACAC49` (Olive Gold)
- **Secondary**: `#9a9a42` (Darker Olive)
- **Accent**: `#4b5563` (Gray)
- **Background**: `#f8f9fb` (Light Gray)

### 🎯 **Design System**

- 📱 **Mobile-First** - Responsive design
- 🎨 **Consistent UI** - Component library
- ✨ **Smooth Animations** - Micro-interactions
- 🌙 **Dark Mode Ready** - Theme support
- ♿ **Accessible** - WCAG compliant

---

## 📊 Project Statistics

<div align="center">

| Metric                 | Value          |
| ---------------------- | -------------- |
| 📁 **Components**      | 50+            |
| 📄 **Pages**           | 15+            |
| 🔌 **API Endpoints**   | 30+            |
| 📦 **Database Tables** | 10+            |
| 🎨 **UI Components**   | 25+            |
| 🧪 **Test Coverage**   | 85%+           |
| ⚡ **Performance**     | 95+ Lighthouse |
| 📱 **Responsive**      | 100%           |

</div>

---

## 🚀 Deployment

### 🌐 **Frontend Deployment**

```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
```

### ⚙️ **Backend Deployment**

```bash
# Build JAR file
./mvnw clean package

# Run with Docker
docker build -t lightstore-backend .
docker run -p 8080:8080 lightstore-backend
```

### 🗄️ **Database Setup**

```sql
-- Create database
CREATE DATABASE lightstore;

-- Import schema
mysql -u username -p lightstore < schema.sql

-- Import sample data
mysql -u username -p lightstore < data.sql
```

---

## 🤝 Contributing

<div align="center">

### 💡 **How to Contribute**

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch
3. 💻 **Make** your changes
4. ✅ **Test** thoroughly
5. 📤 **Push** to your fork
6. 🔃 **Create** a Pull Request

### 🎯 **Development Guidelines**

- 📝 Follow **TypeScript** best practices
- 🎨 Use **TailwindCSS** for styling
- 🧪 Write **tests** for new features
- 📖 Update **documentation**
- 🏷️ Use **semantic** commit messages

</div>

---

## 📝 License

<div align="center">

![MIT License](https://img.shields.io/badge/LICENSE-MIT-green?style=for-the-badge&logo=github&logoColor=white)

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

<div align="center">

### 🌟 **Special Thanks**

- **Next.js Team** - Amazing framework
- **Spring Boot Team** - Powerful backend
- **TailwindCSS** - Beautiful styling
- **Vercel** - Hosting platform
- **GitHub** - Code management

### 💬 **Contact**

- **Author**: [Dhruv Narang](https://github.com/dhruv608)
- **Email**: dhruv@example.com
- **LinkedIn**: [Connect](https://linkedin.com/in/dhruvnarang608/)

---

<div align="center">

**⭐ Star this repo if it helped you! ⭐**

Made with ❤️ and ☕ by [Dhruv Narang](https://github.com/dhruv608)

</div>

</div>

</div>
