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

## 🏗️ Project Structure

```
E-Commerce/
├── backend/                          # Express.js REST API
│   ├── controllers/
│   │   ├── auth.controller.js        # Authentication & profile management
│   │   ├── product.controller.js     # Product CRUD operations
│   │   ├── cart.controller.js        # Shopping cart logic
│   │   ├── order.controller.js       # Order management
│   │   ├── coupon.controller.js      # Coupon validation & management
│   │   ├── payment.controller.js     # Razorpay payment handling
│   │   └── analytics.controller.js   # Admin analytics
│   ├── models/
│   │   ├── user.model.js             # User schema with profiles
│   │   ├── product.model.js          # Product catalog
│   │   ├── order.model.js            # Order tracking
│   │   └── coupon.model.js           # Discount codes
│   ├── routes/                       # API route definitions
│   ├── middleware/
│   │   └── auth.middleware.js        # JWT verification
│   ├── lib/
│   │   ├── db.js                     # MongoDB connection
│   │   ├── razorpay.js               # Payment gateway
│   │   └── redis.js                  # Cache & token storage
│   └── server.js                     # Express server setup
│
├── frontend/                         # React.js E-Commerce UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation with AI Advisor button
│   │   │   ├── CartItem.jsx          # Cart item display
│   │   │   ├── ProductCard.jsx       # Product listing card
│   │   │   ├── CreateProductForm.jsx # Admin product creation
│   │   │   └── ...                   # Other UI components
│   │   ├── pages/
│   │   │   ├── HomePage.jsx          # Home with featured products
│   │   │   ├── LoginPage.jsx         # User authentication
│   │   │   ├── CartPage.jsx          # Shopping cart
│   │   │   ├── UserPage.jsx          # Account dashboard (Details/Orders/Coupon)
│   │   │   ├── AdminPage.jsx         # Admin dashboard
│   │   │   └── ...                   # Other pages
│   │   ├── stores/
│   │   │   ├── useUserStore.js       # Auth state (Zustand)
│   │   │   ├── useCartStore.js       # Cart state (Zustand)
│   │   │   └── useProductStore.js    # Products state (Zustand)
│   │   ├── lib/
│   │   │   └── axios.js              # API client with interceptors
│   │   ├── App.jsx                   # Main app component with routing
│   │   └── index.css                 # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── stylo-ai-fashion-advisor/         # Standalone AI Advisor App (React + TypeScript)
    ├── components/
    │   ├── Header.tsx                # App header with "Maison Belle"
    │   ├── ChatInterface.tsx         # Chat message container
    │   ├── ChatMessage.tsx           # Individual message bubble
    │   ├── UserInput.tsx             # Input field & send button
    │   └── LoadingSpinner.tsx        # Loading indicator
    ├── services/
    │   └── geminiService.ts          # Google Generative AI integration
    ├── App.tsx                       # Root component
    ├── index.tsx                     # Entry point
    ├── index.html                    # HTML template
    ├── vite.config.ts               # Vite configuration (port 3000)
    └── package.json
```

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

## 🎨 Design System: Maison Belle

The entire platform uses a cohesive luxury editorial aesthetic with the following color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Brown | `#5e412f` | Headers, primary buttons, text |
| Warm Beige | `#e8e0d4` | Navigation bar background |
| Light Cream | `#f5f0e8` | Page backgrounds |
| Soft Brown | `#7b6650` | Secondary text, descriptions |
| Accent Brown | `#9c7e5c` | Accent buttons, highlights |
| Border Taupe | `#e9ded2` | Borders, dividers |
| Card White | `#fdfaf5` | Card backgrounds |

### Typography
- **Display/Headers**: Cormorant Garamond (serif) - Editorial luxury feel
- **Body/UI**: Manrope (sans) - Clean readability
- **Spacing**: Wide letter-spacing for sophisticated appearance
- **Animations**: 
  - `riseIn`: 0.5s ease-out slide-up entrance
  - `bubbleDot`: 0.9s ease-in-out typing indicator animation

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

## 🔐 Authentication

### JWT Flow
1. User signs up/logs in at `/login` or `/signup`
2. Backend validates credentials and returns JWT access token
3. Access token stored in httpOnly cookie (secure, HTTP-only)
4. Token sent with each API request via `Authorization: Bearer {token}`
5. On token expiration, refresh token (stored in Redis) issues new access token

### Refresh Token Strategy
- Access tokens: 15 minutes validity
- Refresh tokens: 7 days validity
- Auto-refresh via Axios interceptor on 401 responses
- Dual-layer security with httpOnly cookies + Redis persistence

---

## 📊 API Endpoints

### Authentication (`/api/auth`)
```
POST   /signup                    # Create new user account
POST   /login                     # User login
POST   /logout                    # Clear session
POST   /refresh-token            # Refresh expired access token
GET    /profile                   # Get authenticated user profile
PUT    /profile                   # Update user details (name, email, address, contactNumber)
```

### Products (`/api/products`)
```
GET    /                          # List all products with filtering
GET    /:id                       # Get product details
POST   /                          # Create product (admin only)
PUT    /:id                       # Update product (admin only)
DELETE /:id                       # Delete product (admin only)
```

### Cart (`/api/cart`)
```
GET    /                          # Get user's cart
POST   /add                       # Add item to cart
PUT    /update/:id               # Update item quantity
DELETE /remove/:id               # Remove item from cart
```

### Orders (`/api/orders`)
```
POST   /                          # Create order (checkout)
GET    /user                      # Get user's order history
GET    /:id                       # Get order details
PUT    /:id/status               # Update order status (admin only)
```

### Coupons (`/api/coupons`)
```
GET    /                          # Get active coupon
POST   /validate                  # Validate coupon code
```

### Analytics (`/api/analytics`)
```
GET    /dashboard                 # Get sales analytics (admin only)
GET    /revenue                   # Get revenue data (admin only)
```

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

### Database Models
**User**: `name`, `email`, `password`, `role` (user/admin), `contactNumber`, `address`, `createdAt`

**Product**: `name`, `description`, `price`, `image`, `category`, `stock`, `rating`, `reviews`, `createdAt`

**Order**: `userId`, `items[]`, `totalAmount`, `status`, `shippingAddress`, `paymentId`, `createdAt`

**Coupon**: `code`, `discount%`, `expiryDate`, `active`, `maxUses`, `usedCount`

---

## 📱 Responsive Breakpoints
- **Mobile (320px+)**: Single column layout
- **Tablet (768px+)**: Two-column grid
- **Desktop (1024px+)**: Full width with navigation

---

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

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📝 License

This project is private. For usage inquiries, contact the development team.

---

## 👨‍💻 Development Notes

### State Management
- User authentication & profile: Zustand (`useUserStore`)
- Shopping cart: Zustand (`useCartStore`)
- Products: Zustand (`useProductStore`)
- API call interceptors handle token refresh automatically

### API Communication
- Base URL: `/api` (proxied to `http://localhost:5000` in dev)
- All requests include credentials for cookie-based auth
- Error handling with toast notifications

### Styling Approach
- Tailwind CSS for utility-driven styling
- CSS variables for design system tokens
- Custom animations in `index.css` for entrance effects
- Font imports from Google Fonts

### Performance Optimizations
- React lazy loading for code splitting
- Vite fast HMR (Hot Module Replacement)
- Efficient Zustand state slices
- Redis caching for auth tokens
- Image optimization with ImgBB API

---

## 🐛 Troubleshooting

**Backend won't start**
- Check port 5000 isn't in use: `netstat -ano | findstr :5000`
- Verify MongoDB connection string in `.env`
- Check all required environment variables are set

**Frontend won't load API data**
- Ensure backend is running on port 5000
- Check Vite proxy configuration in `vite.config.js`
- Verify CORS settings in `backend/server.js`

**AI Advisor not opening**
- Check Stylo app is running on port 3000
- Verify `VITE_AI_ADVISOR_URL` in frontend `.env`
- Clear browser cache and refresh

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Google Generative AI](https://ai.google.dev)
- [Razorpay Integration](https://razorpay.com/docs)
- [MongoDB & Mongoose](https://mongoosejs.com)

---

**Last Updated**: March 2026

For questions or support, reach out to the development team.
