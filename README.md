# 🎭 Moodify

**Turn Boredom Into Productive Fun**

Moodify is a full-stack web application that provides personalized content recommendations based on your current mood, interests, and desired activities. Using an intelligent recommendation algorithm, Moodify helps users discover engaging content tailored to their emotional state, including curated playlists, videos, games, and more.

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Recommendation Algorithm](#-recommendation-algorithm)
- [Security Features](#-security-features)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

### 🎯 **Mood-Based Tracking**
- Interactive mood selection interface with 3 emotional states (Happy, Neutral, Not So Great)
- Visual feedback and persistent state management
- Mood influences content recommendations through weighted algorithms

### 🎨 **Personalized Activity Selection**
- Choose from 4 activity categories:
  - **Art & Design** - Creative content and artistic inspiration
  - **Fitness** - Workout routines, wellness podcasts, and motivation
  - **Tech** - Tutorials, innovations, and RPG games
  - **Travel & Culture** - Documentaries and cultural exploration

### 🎪 **Theme Customization**
- Define your daily intent:
  - **Learning Something New** - Educational and skill-building content
  - **Unwinding and Relaxing** - Calm and stress-relieving activities
  - **Getting Creative** - Inspiration for artistic expression

### 🎵 **Curated Content Recommendations**
- Hand-picked playlists, videos, and activities
- Links to popular platforms (Spotify, YouTube, Netflix, etc.)
- Content matched to mood, activity, and theme combinations
- Direct access to external resources

### 🔐 **Secure Authentication System**
- JWT-based user authentication with 1-hour token expiration
- Bcrypt password hashing with automatic salt generation
- Protected routes with middleware authorization
- Email validation and unique username enforcement

### 🧠 **Intelligent Recommendation Algorithm**
- **Two-tier filtering system:**
  1. **Hard Constraint:** Theme-based content filtering
  2. **Soft Constraint:** Mood-weighted scoring (boost multipliers)
- Weighted random selection for variety
- Fallback mechanisms for edge cases

### 🎨 **Modern UI/UX**
- Responsive design with gradient backgrounds
- Smooth animations and hover effects
- Dark theme with purple/blue color scheme
- Mobile-friendly interface

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI component library |
| React Router DOM | 6.28.0 | Client-side routing |
| Lucide React | 0.456.0 | Icon library |
| CSS3 | - | Styling with animations |

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | JavaScript runtime |
| Express.js | 4.21.1 | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 8.8.2 | MongoDB object modeling |
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| CORS | 2.8.5 | Cross-origin middleware |
| dotenv | 16.4.5 | Environment variables |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│                     (React SPA - Port 3001)                  │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Components  │  │    Routing   │  │ State Mgmt   │      │
│  │  (10 pages)  │  │ (React Router)│ │ (localStorage)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP/REST API Calls
                            │
┌─────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                          │
│                  (Express.js API - Port 5000)                │
│                                                               │
│  ┌──────────────┐  ┌──────────────────────────────┐        │
│  │ Auth Routes  │  │   Recommendation Engine      │        │
│  │   (JWT)      │  │   (Algorithm Logic)          │        │
│  └──────────────┘  └──────────────────────────────┘        │
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Middleware (CORS, Auth, JSON)            │       │
│  └──────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            │
                    Mongoose ODM
                            │
┌─────────────────────────────────────────────────────────────┐
│                       DATABASE LAYER                         │
│                   (MongoDB - Port 27017)                     │
│                                                               │
│  ┌────────────────────────────────────────────┐             │
│  │         User Collection (Schema)           │             │
│  │  - username, email, password (hashed)      │             │
│  │  - createdAt timestamp                     │             │
│  └────────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### **Data Flow**

```
User Login → JWT Token Generated → localStorage Storage
                                          ↓
User Selects Mood → Stored in localStorage → Algorithm Processes
                                          ↓
User Selects Activity → Combined with Mood → Filtering Applied
                                          ↓
User Selects Theme → Final Filtering → Recommendations Generated
                                          ↓
Display Curated Content → Links to External Platforms
```

---

## 📁 Project Structure

```
Moodify/
│
├── public/                          # Static assets
│   ├── index.html                   # HTML entry point
│   ├── manifest.json                # PWA manifest
│   └── images/                      # UI images (game, music, fitness, travel)
│       ├── game.webp
│       ├── music.jpeg
│       ├── fitness.jpg
│       └── travel.jpeg
│
├── src/                             # React frontend source
│   ├── index.js                     # React entry point
│   ├── App.js                       # Router configuration (10 routes)
│   ├── App.css                      # Global styles
│   ├── index.css                    # Root CSS stylesheet
│   │
│   ├── landing.js                   # Public landing page
│   ├── login.js                     # User login page
│   ├── signup.js                    # User registration page
│   ├── dashboard.js                 # User dashboard (protected)
│   │
│   ├── mood-tracker.js              # Mood selection interface
│   ├── activities.js                # Activity selection page
│   ├── theme.js                     # Theme selection page
│   │
│   ├── recommendations.js           # Recommendation display
│   ├── results.js                   # Transition page
│   ├── content.js                   # Final content display
│   │
│   ├── recommendation-data.js       # Content library + algorithm logic
│   └── api.js                       # API utility functions
│
├── full-stack-auth/server/          # Backend server
│   ├── server.js                    # Express server + routes
│   ├── .env                         # Environment variables
│   ├── package.json                 # Backend dependencies
│   │
│   ├── config/
│   │   └── db.js                    # Database connection config
│   │
│   └── middleware/
│       └── auth.js                  # JWT verification middleware
│
├── package.json                     # Frontend dependencies
├── package-lock.json                # Dependency lock file
├── .gitignore                       # Git exclusions
└── README.md                        # This file
```

---

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)

---

## 🚀 Installation

### **Step 1: Clone the Repository**

```bash
git clone <your-repo-url>
cd Moodify
```

### **Step 2: Install Frontend Dependencies**

```bash
npm install
```

### **Step 3: Install Backend Dependencies**

```bash
cd full-stack-auth/server
npm install
cd ../..
```

### **Step 4: Start MongoDB**

```bash
# Windows (if installed as service)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod

# Or use MongoDB Compass GUI
```

---

## ⚙ Configuration

### **Configure Environment Variables**

Create/edit `full-stack-auth/server/.env`:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moodify
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
```

**Security Note:** Never commit `.env` file to version control!

### **Update Frontend Port (if needed)**

In `package.json`, the frontend runs on port 3001:

```json
"scripts": {
  "start": "set PORT=3001 && react-scripts start"
}
```

---

## 🎯 Usage

### **Start the Application**

#### **Terminal 1 - Backend Server:**

```bash
cd full-stack-auth/server
node server.js
```

Expected output:
```
Server running on port 5000
Connected to MongoDB
```

#### **Terminal 2 - Frontend App:**

```bash
# From project root
npm start
```

Expected output:
```
Compiled successfully!
You can now view moodify in the browser.
Local: http://localhost:3001
```

### **Access the Application**

Open your browser and navigate to: **http://localhost:3001**

### **User Flow:**

1. **Landing Page** - View welcome screen with animated elements
2. **Sign Up** - Create an account (username, email, password)
3. **Login** - Authenticate with credentials
4. **Dashboard** - Access main hub with user profile
5. **Mood Tracker** - Select your current mood (HAPPY/NEUTRAL/NOT SO GREAT)
6. **Activities** - Choose your interest area (ART & DESIGN/FITNESS/TECH/TRAVEL)
7. **Theme** - Define your intent (LEARNING/UNWINDING/CREATIVE)
8. **Recommendations** - View personalized suggestions based on your preferences
9. **Content** - Explore selected recommendation with links to external resources

---

## 🔌 API Endpoints

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user (returns JWT) | No |
| GET | `/api/dashboard` | Protected route example | Yes (JWT) |

**Request Body (Signup):**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Login):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

## 🧠 Recommendation Algorithm

### **Algorithm Overview**

Moodify uses a **two-tier hybrid filtering system** combining rule-based and scoring-based approaches:

#### **Tier 1: Theme-Based Filtering (Hard Constraint)**

Filters content based on user's selected theme:

```javascript
Theme Mapping:
├── "LEARNING SOMETHING NEW" → [RPG Games, Travel Documentaries]
├── "UNWINDING AND RELAXING" → [Fitness Podcasts, Music Exploration]
└── "GETTING CREATIVE" → [RPG Games]
```

#### **Tier 2: Mood-Based Weighting (Soft Constraint)**

Applies boost multipliers based on emotional state:

```javascript
Mood Preferences:
├── "HAPPY"
│   ├── Prefers: TECH, ART & DESIGN
│   └── Boost: 1.2x weight
│
├── "NEUTRAL"
│   ├── Prefers: FITNESS, TRAVEL AND CULTURE
│   └── Boost: 1.0x weight
│
└── "NOT SO GREAT"
    ├── Prefers: UNWINDING AND RELAXING, ART & DESIGN
    └── Boost: 0.9x weight
```

### **Content Library**

The system includes curated content across 4 categories:

1. **Role-Playing Games (RPG)**
   - Tags: TECH, LEARNING SOMETHING NEW
   - Links to Elder Scrolls Online, D&D Beyond

2. **Music Exploration**
   - Tags: ART & DESIGN, UNWINDING AND RELAXING
   - Curated Spotify playlists and YouTube music videos

3. **Fitness Podcast**
   - Tags: FITNESS, GETTING CREATIVE
   - Apple Podcasts and YouTube motivational content

4. **Travel Documentaries**
   - Tags: TRAVEL AND CULTURE, LEARNING SOMETHING NEW
   - Netflix documentaries and National Geographic content

### **Algorithm Flow**

```
1. User Input: Mood + Activity + Theme
                    ↓
2. Theme Filter: Narrow content library (Hard Rule)
                    ↓
3. Mood Weighting: Apply boost multipliers (Soft Scoring)
                    ↓
4. Weighted Selection: Randomized selection based on scores
                    ↓
5. Display: Top 3 personalized recommendations with links
```

### **Example Calculation**

**User Input:**
- Mood: HAPPY
- Activity: TECH
- Theme: LEARNING SOMETHING NEW

**Processing:**
1. Theme filter → Returns: [RPG, Travel Docs]
2. Mood boost → TECH preference (1.2x) → RPG weighted higher
3. Weighted random selection → RPG selected
4. Display recommendation with curated links

**Implementation:** See [recommendation-data.js](src/recommendation-data.js) for the complete algorithm implementation.

---

## 🔐 Security Features

### **1. Password Security**
- **bcrypt hashing** with automatic salt generation (10 rounds)
- Minimum password length: 6 characters
- No plaintext storage in database

### **2. JWT Authentication**
- Stateless authentication tokens
- 1-hour expiration time
- Signed with secret key (256-bit recommended)
- Verified on each protected route

### **3. Input Validation**
- Email regex validation
- Username uniqueness check
- Password strength requirements
- MongoDB injection prevention via Mongoose

### **4. CORS Protection**
- Whitelisted origins only (localhost:3000, 3001)
- Restricted HTTP methods
- Controlled header access

### **5. Environment Variables**
- Sensitive configuration stored in `.env`
- Database credentials isolated from code
- JWT secret key never exposed

### **6. Middleware Protection**
```javascript
authMiddleware → Verifies JWT → Grants/Denies Access
```

**Implementation:** See [server.js:166-180](full-stack-auth/server/server.js#L166-L180) for the authentication middleware.

---


## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### **Code Style Guidelines**
- Use ES6+ syntax
- Follow Airbnb JavaScript Style Guide
- Write meaningful commit messages
- Add comments for complex logic
- Update README for new features

---




## 📊 Project Statistics

- **Total Lines of Code:** ~2,000+
- **React Components:** 10
- **API Endpoints:** 3 (Authentication)
- **Database Collections:** 1 (Users)
- **Authentication:** JWT-based
- **Password Security:** bcrypt (10 rounds)
- **Content Categories:** 4 (RPG, Music, Fitness, Travel)
- **Mood States:** 3 (Happy, Neutral, Not So Great)
- **Activity Types:** 4 (Art & Design, Fitness, Tech, Travel)
- **Themes:** 3 (Learning, Unwinding, Creative)

---




<div align="center">

**Made with ❤️ and ☕ by Shambhavi PM and Shreeya S Methuku**

⭐ Star this repo if you found it helpful!

</div>
