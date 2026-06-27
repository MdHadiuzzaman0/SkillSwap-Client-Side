# 🎯 SkillSwap — Freelance Micro-Task Platform

<div align="center">
  <h3>Connect skilled freelancers with clients for quick, simple micro-tasks</h3>
  <p><em>Post tasks, get proposals, pay securely, and get work done in days — not weeks.</em></p>

  ![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
  ![BetterAuth](https://img.shields.io/badge/BetterAuth-black?style=for-the-badge&logo=auth0&logoColor=white)

</div>

---

## 🔗 Live URL

**Frontend:** https://skill-swap-client-side.vercel.app/  
**Backend:** https://skill-swap-server-side.vercel.app/

---

## 📖 What is SkillSwap?

SkillSwap is a modern freelance marketplace for **micro-tasks** — small, quick projects that need completion in days, not months. 

- **Clients** post tasks like logo design, article writing, or bug fixes with budget and deadline
- **Freelancers** browse tasks, submit proposals with pricing and timeline
- **Clients** review proposals, accept the best one, and pay securely via Stripe
- **Freelancers** complete work, submit deliverables, and earn payment
- **Admin** manages users, tasks, and platform transactions

Think of it as **Fiverr meets Upwork** — but simpler and faster.

---

## ✨ Key Features

### 🔐 **Authentication**
- Email/password login with validation (6+ chars, uppercase, lowercase)
- Google OAuth 2.0 integration (auto-registers as Client)
- JWT-protected API routes with secure token handling
- Session persistence with HTTPOnly cookies

### 📋 **Client Features**
- ➕ Post tasks with title, category, description, budget, and deadline
- 👁️ View all posted tasks with status tracking (Open, In Progress, Completed)
- ✏️ Edit open tasks anytime
- 🗑️ Delete tasks (only if no proposal accepted)
- 📊 Manage freelancer proposals (Accept/Reject)
- 💳 Secure Stripe checkout for payments
- 📈 Dashboard with task stats and spending overview

### 🎯 **Freelancer Features**
- 🔍 Browse all open marketplace tasks with filters
- 💬 Submit proposals with custom budget, timeline, and cover note
- 📤 View all submitted proposals with status updates
- ✅ Accept and track active projects
- 📤 Submit deliverable URLs to mark tasks complete
- 💰 View earnings breakdown from completed tasks
- 👤 Edit public profile with skills, bio, and portfolio link

### ⚙️ **Admin Features**
- 👥 View all platform users and manage block status
- 🔒 Block/unblock user accounts instantly
- 📋 View all tasks and delete content violating guidelines
- 💵 Transaction history with all Stripe payments
- 📊 Platform overview (total users, tasks, revenue, active work)

### 🔍 **Search & Filter**
- Title-based search on Browse Tasks page (real-time filtering)
- Category dropdown filtering (Web Development, Design, Content, etc.)
- Combined search + filter support

### 💳 **Payment System**
- Stripe Checkout integration for secure payments
- Escrow-backed transactions (payment held until delivery)
- Payment success page with transaction confirmation
- Automatic task status update to "In Progress" after payment
- Complete payment history tracking

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16 (Turbopack) | Full-stack framework with App Router |
| **Styling** | Tailwind CSS, DaisyUI, HeroUI | Responsive UI components |
| **Auth** | Better Auth | Email/password + Google OAuth |
| **Backend** | Express.js | RESTful API server |
| **Database** | MongoDB | Document-based data storage |
| **Payment** | Stripe API | Secure payment processing |
| **Icons** | React Icons | SVG icon library |
| **Deployment** | Vercel (Frontend), Render (Backend) | Production hosting |

---

## 📦 NPM Packages

### Frontend
```json
{
  "next": "^16.2.9",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "better-auth": "^1.x.x",
  "react-hot-toast": "^2.x.x",
  "react-icons": "^5.x.x",
  "tailwindcss": "^3.x.x",
  "daisyui": "^4.x.x",
  "@heroui/react": "^2.x.x"
}
```

### Backend
```json
{
  "express": "^4.x.x",
  "mongodb": "^6.x.x",
  "better-auth": "^1.x.x",
  "stripe": "^14.x.x",
  "cors": "^2.x.x",
  "dotenv": "^16.x.x"
}
```

---

## 🗂️ Project Structure

```
📁 Frontend (Next.js)
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── login/page.jsx
│   │   └── signup/page.jsx
│   ├── 📁 (main)/
│   │   ├── browse-tasks/page.jsx
│   │   ├── [id]/page.jsx (Task Details)
│   │   ├── browse-freelancers/page.jsx
│   │   └── create-profile/page.jsx
│   ├── 📁 dashboard/
│   │   ├── 📁 client/
│   │   │   ├── intro/page.jsx
│   │   │   ├── post-task/page.jsx
│   │   │   ├── my-tasks/page.jsx
│   │   │   └── proposals/page.jsx
│   │   ├── 📁 freelancer/
│   │   │   ├── intro/page.jsx
│   │   │   ├── my-proposals/page.jsx
│   │   │   ├── active-projects/page.jsx
│   │   │   ├── earnings/page.jsx
│   │   │   └── profile/page.jsx
│   │   └── 📁 admin/
│   │       ├── intro/page.jsx
│   │       ├── users/page.jsx
│   │       ├── tasks/page.jsx
│   │       └── transactions/page.jsx
│   ├── 📁 api/auth/[...all]/route.js
│   ├── payment/
│   │   ├── checkout/page.jsx
│   │   └── success/page.jsx
│   ├── layout.js
│   └── page.jsx (Home)
├── 📁 components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── TaskCard.jsx
│   ├── ProposalTable.jsx
│   ├── AdminUsers.jsx
│   └── ...other components
├── 📁 lib/
│   ├── auth.js (Better Auth server)
│   ├── auth-client.js (Client-side auth)
│   ├── data.js (Fetch functions)
│   ├── action.js (Server actions)
│   └── stripe.js (Stripe config)
├── 📁 middleware.js (Route protection)
└── package.json

📁 Backend (Express.js)
├── 📁 routes/
│   ├── tasks.js
│   ├── proposals.js
│   ├── users.js
│   ├── payments.js
│   └── admin.js
├── 📁 models/
│   └── (MongoDB collections)
├── 📁 middleware/
│   └── auth.js
├── index.js (Server entry)
├── .env
└── package.json
```

---

## ⚙️ Core Implementation

### 1️⃣ **Authentication Flow**
```
User fills login form
→ BetterAuth validates credentials
→ JWT token generated and stored in HTTPOnly cookie
→ Token passed in Authorization header for protected routes
→ Session middleware validates token on server actions
```

### 2️⃣ **Task Posting Flow**
```
Client fills "Post Task" form
→ Server Action sends POST to /post-task endpoint
→ Backend validates & stores in MongoDB tasks collection
→ Page revalidates automatically
→ Task visible to all freelancers in Browse page
```

### 3️⃣ **Proposal & Payment Flow**
```
Freelancer submits proposal
→ Stored in proposals collection (status: pending)
→ Client reviews in "Manage Proposals" section
→ Client clicks "Accept" 
→ Redirects to Stripe Checkout page
→ Payment successful → Task status → "In Progress"
→ Freelancer notified to start work
→ Freelancer submits deliverable URL
→ Client marks task as "Completed"
```

### 4️⃣ **Search & Filter**
```
User types in search bar
→ Real-time fetch with query parameter
→ Backend searches task title field
→ Results displayed instantly (no page reload)

User selects category dropdown
→ POST request with selected categories
→ Backend filters by category array
→ Results update in place
```

### 5️⃣ **Admin Dashboard**
```
Admin views "Manage Users" section
→ Fetches all users from database
→ Shows name, email, role, block status
→ Click "Block" → User immediately blocked
→ Blocked users cannot login or post tasks
```




---

## 🔒 Security Features

✅ **JWT Authentication** — Secure token-based auth  
✅ **HTTPOnly Cookies** — Token stored securely in cookies  
✅ **Role-Based Access Control** — Separate dashboards for client/freelancer/admin  
✅ **Middleware Protection** — Routes validated on server  
✅ **Stripe Escrow** — Payments held securely until delivery  
✅ **Input Validation** — All forms validated on frontend & backend  
✅ **CORS Configuration** — API only accepts requests from deployed domain  

---

## 📱 Responsive Design

✅ Mobile-first Tailwind CSS layout  
✅ Mobile sidebar navigation toggle  
✅ Responsive grid layouts (1 col mobile, 2-3 cols desktop)  
✅ Touch-friendly button sizing  
✅ Optimized images with Next.js Image component  

---

## 🎨 UI/UX Highlights

- **Color Scheme:** Navy (#1E242B), Tan/Gold (#C9B08B), Cream (#EAE0D5)
- **Typography:** Professional serif headings, clean sans-serif body text
- **Animations:** Smooth transitions on hover, fade-in effects on load
- **Cards:** Uniform heights, consistent spacing, subtle shadows
- **Forms:** Clear error messages, success toasts, loading states

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin1@taskhive.com | admin1@taskhive.com |

---

## 🚨 Deployment Checklist

- ✅ Environment variables set in Vercel
- ✅ MongoDB connection string configured
- ✅ Stripe keys added (test → live)
- ✅ Google OAuth redirect URIs updated
- ✅ Backend CORS allows Vercel domain
- ✅ No hardcoded localhost URLs
- ✅ All routes tested after refresh
- ✅ Payment flow tested end-to-end

---

## 🐛 Known Issues & Fixes

| Issue | Status | Fix |
|-------|--------|-----|
| Double slash in API URLs | ✅ Fixed | Remove trailing slash from env vars |
| CORS errors | ✅ Fixed | Added Vercel domain to backend |
| Page refresh logout | ✅ Fixed | Persistent JWT in cookies |
| Missing pages (404) | ✅ Fixed | Created Terms & Privacy pages |

---

## 🔄 Git Commits

**Frontend Commits:** 20+ (feature branches, bug fixes, deployment)  
**Backend Commits:** 12+ (API endpoints, database, payment integration)

---

## 📝 License

Private project for educational purposes.

---

## 👨‍💻 Author

**Md Hadiuzzaman**

- GitHub: [@MdHadiuzzaman0](https://github.com/MdHadiuzzaman0)
- Email: mdhadiuzzaman483@gmail.com
- WhatsApp: +880 1794093742

---

## 🙏 Acknowledgments

Built with Next.js, Stripe, Better Auth, and MongoDB. Deployed on Vercel and Render.

---

**Last Updated:** June 2026  
**Status:** ✅ Production Ready
