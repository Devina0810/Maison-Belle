# Maison Belle - E-Commerce & AI Fashion Advisor

A premium e-commerce platform with an integrated AI-powered fashion advisory chatbot, featuring a cohesive luxury editorial aesthetic.

## 🎨 Overview

**Maison Belle** is a full-stack e-commerce application paired with **Stylo AI Fashion Advisor**, an intelligent chatbot for personalized fashion recommendations. The entire platform is styled with an editorial luxury aesthetic featuring warm neutrals, refined typography, and sophisticated animations.

### Key Features

- **Premium E-Commerce Store** - Browse, filter, and purchase fashion products
- **User Account Management** - Personalized account page with order history and coupon management
- **AI Fashion Advisor** - Standalone chatbot powered by Google Gemini for styling recommendations
- **Admin Dashboard** - Product management and analytics for administrators
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **Cart & Checkout** - Seamless shopping experience with Razorpay payment integration
- **Authentication** - Secure JWT-based auth with httpOnly cookies and refresh tokens

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 5.4.19** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Page navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **Framer Motion** - Animations

### Backend
- **Node.js & Express.js** - REST API server
- **MongoDB Atlas** - NoSQL database (with Mongoose ODM)
- **Ioredis & Upstash** - Caching & token persistence
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Razorpay SDK** - Payment processing
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

### AI Advisor
- **React + TypeScript** - Type-safe UI components
- **@google/generative-ai** - Gemini API integration
- **Vite 6.4.1** - Build & dev server

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account & connection string
- Redis/Upstash account for token storage
- Google Cloud account with Generative AI API enabled
- Razorpay account for payment testing

### Environment Variables

**Backend** (`backend/.env`):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/maison-belle
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
UPSTASH_REDIS_URL=redis://default:password@host:port
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
NODE_ENV=development
PORT=5000
```

**Frontend** (`frontend/.env`):
```env
VITE_CLIENT_URL=http://localhost:5173
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_AI_ADVISOR_URL=http://localhost:3000
```

**Stylo App** (`stylo-ai-fashion-advisor/.env`):
```env
GEMINI_API_KEY=your_google_generative_ai_key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Devina0810/Maison-Belle.git
   cd E-Commerce
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install AI Advisor dependencies**
   ```bash
   cd ../stylo-ai-fashion-advisor
   npm install
   ```

---

## 📦 Running the Application

### Start All Services

**Terminal 1: Backend (port 5000)**
```bash
cd backend
npm start
```

**Terminal 2: Frontend (port 5173)**
```bash
cd frontend
npm run dev
```

**Terminal 3: Stylo AI Advisor (port 3000)**
```bash
cd stylo-ai-fashion-advisor
npm run dev
```

### Access the Applications
- **Main Store**: http://localhost:5173
- **Admin Dashboard**: http://localhost:5173/secret-dashboard (admin login required)
- **Stylo AI Advisor**: http://localhost:3000 (accessed via navbar button)
- **API**: http://localhost:5000/api

---

## 🎯 User Features

### Shopper
- Browse products by category
- Search & filter by price, rating, popularity
- Add items to cart
- Secure checkout with Razorpay
- View order history
- Manage user profile (name, email, address, contact)
- Access available coupons & discounts
- Use AI Advisor for fashion recommendations

### Administrator
- Product management (create, update, delete)
- View sales analytics & revenue charts
- Monitor orders & statuses
- Manage coupons & promotional codes
- Access dashboard with key metrics

### Guest
- Browse products without login
- Use AI Fashion Advisor (no login required)
- Create account or login to checkout

---

## 🤖 Stylo AI Fashion Advisor

### Features
- **Intelligent Recommendations**: Leverages Google Gemini API for personalized styling advice
- **Conversational Interface**: Natural language chat with typing indicators
- **Responsive Design**: Matches Maison Belle aesthetic
- **Editorial Branding**: Consistent luxury positioning
- **Standalone App**: Can be used independently or integrated into main store

### How to Use
1. Click "AI Advisor" button in the navbar
2. Type your fashion question or style preference
3. Receive personalized recommendations from Stylo
4. Seamlessly navigate back to shopping

---

## 🔧 Configuration

### CORS Settings
The backend allows requests from:
- `http://localhost:5173` (main frontend)
- `http://localhost:3000` (Stylo AI app)
- Production domains (configurable)


## 🚀 Deployment

### Build for Production

**Backend**:
```bash
npm install --production
npm start  # Uses NODE_ENV=production
```

**Frontend**:
```bash
npm run build  # Creates dist/ folder
npm run preview  # Preview production build
```

**Stylo App**:
```bash
npm run build  # Creates dist/ folder
```

### Deployment Platforms
- **Backend**: Render, Heroku, AWS, DigitalOcean
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Stylo**: Vercel, Netlify

---
