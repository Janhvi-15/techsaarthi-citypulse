# CityPulse 🏙️

A comprehensive smart city platform for civic engagement that enables citizens to report infrastructure issues, track their resolution status, and participate in community-driven prioritization. Built with a modern MERN stack architecture featuring role-based dashboards for citizens, staff members, and administrators.


## 🌟 Overview

CityPulse is a modern civic engagement platform designed to bridge the gap between citizens and municipal authorities. It provides a transparent, efficient system for reporting, tracking, and resolving urban infrastructure issues through community participation and smart prioritization.

### Why CityPulse?

- **⚡ Real-time Updates**: Track incident progress instantly from submission to resolution
- **📍 Location-Aware**: Precise GPS-based issue mapping and intelligent staff allocation
- **👥 Community Powered**: Democratic voting system to prioritize urgent issues
- **📊 Smart Analytics**: Data-driven decision making with dynamic priority calculation
- **🔒 Secure & Scalable**: JWT authentication, role-based access, and MongoDB for reliability

## ✨ Features

### Core Functionality

#### 🎯 For Citizens
- **Incident Reporting**: Submit infrastructure issues with photos, descriptions, and GPS coordinates
- **Community Voting**: Upvote/downvote incidents (Twitter-style mutual exclusion)
- **Multi-View Dashboard**:
  - Overview with live statistics
  - Interactive Leaflet map with custom markers
  - Community posts feed with filtering
  - Personal incident tracker
- **Smart Submission Limits**: Maximum 3 active reports per user to prevent spam
- **Progress Tracking**: Real-time status updates with visual indicators
- **Search & Filter**: Find incidents by status, category, or location

#### 🛠️ For Staff Members
- **Specialized Assignments**: Receive tasks based on work category and location
- **Task Management**: Update status (Assigned → In Progress → Completed)
- **Priority Indicators**: Color-coded priority badges (Critical, High, Medium, Low)
- **Assignment History**: Track completion times and work notes
- **Clean Interface**: Organized task cards with all relevant information

#### 🛡️ For Administrators
- **Intelligent Assignment**: Auto-match staff to incidents by category and location
- **Priority Management**: Dynamic calculation based on:
  - Number of reports (weight: up to 50 points)
  - Emergency level (weight: up to 30 points)
  - Time waiting (weight: up to 20 points)
- **Incident Grouping**: Cluster similar reports by location and department
- **Staff Allocation**: View available staff and assign with custom priority levels
- **Comprehensive Monitoring**: Track all assignments and incident statuses

### Advanced Features

- **Image Upload**: Multer-powered file handling with 5MB limit
- **Geolocation**: Browser-based GPS coordinate capture
- **Responsive Design**: Mobile-first Tailwind CSS interface
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Skeleton screens and spinners for better UX
- **Error Handling**: Comprehensive validation and user-friendly error messages

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs (10 salt rounds)
- **File Upload**: Multer
- **Validation**: Mongoose Schema Validation

### Frontend
- **Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Maps**: Leaflet + React-Leaflet
- **State Management**: React Context API + Hooks
- **Build Tool**: Vite

### Development Tools
- **API Testing**: Postman
- **Version Control**: Git
- **Package Manager**: npm

## 🏗️ System Architecture

```
CityPulse/
├── backend/                    # Node.js/Express API
│   ├── controllers/           # Request handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── middleware/           # Auth, upload, validation
│   ├── utils/                # Helper functions
│   └── uploads/              # User-uploaded images
│
└── frontend/                  # React application
    ├── src/
    │   ├── api/              # Axios API calls
    │   ├── components/       # Reusable UI components
    │   ├── context/          # React Context (Auth)
    │   ├── pages/            # Route components
    │   │   ├── admin/       # Admin dashboard
    │   │   ├── staff/       # Staff dashboard
    │   │   └── user/        # Citizen dashboard
    │   └── App.jsx          # Main app component
    └── public/
```



## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd citypulse
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URL=mongodb://localhost:27017/citypulse
# Or for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/citypulse

# JWT Secret (use a strong random string in production)
ACCESS_TOKEN_SECRET=your_super_secret_jwt_key_change_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

Create uploads directory:
```bash
mkdir -p uploads/incidents
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

The frontend automatically connects to `http://localhost:3000` as specified in the API configuration.

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server runs on http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Production Mode

**Backend:**
```bash
cd backend
NODE_ENV=production npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```


## 👥 User Roles & Capabilities

### 🧑 Citizens (Public Users)

**Registration**: Open to everyone  
**Capabilities**:
- Submit up to 3 incident reports
- Upload images (max 5MB)
- Vote on incidents (upvote/downvote)
- View community posts
- Track personal submissions
- Search and filter incidents
- View interactive map

**Dashboard Views**:
- **Overview**: Statistics, quick actions, recent reports
- **Map View**: Interactive Leaflet map with incident markers
- **Track Status**: Personal incident tracker with filters
- **Community Posts**: Browse and vote on all incidents

### 🔧 Staff Members

**Registration**: Category and location-based  
**Capabilities**:
- View assigned tasks
- Update assignment status
- Mark incidents as resolved
- Add completion notes
- Filter by status (Assigned, In Progress, Completed)

**Work Categories**:
- Road Damage
- Water Leakage
- Garbage Overflow
- Street Light Issue
- Drainage Problem
- Public Toilet Issue
- Electricity Issue
- Footpath Issue
- Traffic Signal Issue

### 👑 Administrators

**Access**: Invite-only  
**Capabilities**:
- View all incidents with priority scores
- Assign staff to incidents
- Set custom priority levels
- Group similar incidents
- Monitor all assignments
- View comprehensive statistics

**Priority Calculation**:
```javascript
Priority Score = (Reports × 5) + (Emergency Level × 6) + (Hours Waiting)
// Max values: Reports = 50, Emergency = 30, Time = 20
```

## 🔄 Key Workflows

### Incident Reporting Flow
1. Citizen logs in → Dashboard
2. Click "Report New Incident"
3. Fill form (title, category, description, location)
4. Optional: Upload image, use GPS
5. Submit → Incident created with "Open" status
6. Submission count decremented (2/3 remaining)

### Staff Assignment Flow
1. Admin views incident table
2. Incidents grouped by location/category
3. Priority score calculated automatically
4. Admin clicks "Assign" on open incident
5. System fetches matching staff by category & location
6. Admin selects staff member
7. Assignment created, incident status → "Pending"
8. Staff receives task in their dashboard

### Resolution Flow
1. Staff views assignment
2. Updates status to "In Progress"
3. Performs maintenance work
4. Marks as "Resolved" with notes
5. Assignment status → "Completed"
6. Incident status → "Resolved"
7. Citizen's submission count resets (3/3 available)

### Community Voting Flow
1. User views incident post
2. Clicks upvote/downvote button
3. Previous vote removed if switching
4. Vote count updated in real-time
5. Community score calculated (upvotes - downvotes)
6. Admin uses votes for priority decisions

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication Routes

#### Citizens
```http
POST   /auth/register          # Register new citizen
POST   /auth/login             # Citizen login
GET    /auth/me                # Get current user (Protected)
```

#### Staff
```http
POST   /staff/auth/register    # Register new staff
POST   /staff/auth/login       # Staff login
```

#### Admin
```http
POST   /admin/auth/login       # Admin login
```

### Incident Routes

#### Public
```http
GET    /incidents                            # Get all incidents
GET    /incidents/:id/vote-status            # Get vote status
```

#### Protected (Citizens)
```http
POST   /incidents                            # Create incident (with image)
POST   /incidents/:id/upvote                 # Upvote incident
POST   /incidents/:id/downvote               # Downvote incident
GET    /incidents/user/submission-count     # Get user's quota
```

#### Assignment (No Auth Required)
```http
PATCH  /incidents/:id/assign                    # Assign staff
GET    /incidents/assignments                   # Get all assignments
GET    /incidents/assignments/staff/:staffId    # Get staff assignments
PATCH  /incidents/assignments/:id/status        # Update assignment
```

### Request Examples

**Create Incident:**
```bash
curl -X POST http://localhost:3000/api/v1/incidents \
  -H "Authorization: Bearer <token>" \
  -F "title=Pothole on Main Street" \
  -F "category=Road Damage" \
  -F "description=Large pothole causing traffic issues" \
  -F "address=123 Main St, Mumbai" \
  -F "latitude=19.0760" \
  -F "longitude=72.8777" \
  -F "image=@/path/to/photo.jpg"
```

**Upvote Incident:**
```bash
curl -X POST http://localhost:3000/api/v1/incidents/<id>/upvote \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

**Assign Staff:**
```bash
curl -X PATCH http://localhost:3000/api/v1/incidents/<id>/assign \
  -H "Content-Type: application/json" \
  -d '{
    "staffId": "<staff_id>",
    "priority": "High",
    "notes": "Urgent attention required"
  }'
```


### Key Features

#### Interactive Map (Leaflet)
```javascript
// Custom marker icons by status
const createCustomIcon = (status) => {
  const color = status === "Open" ? "#f59e0b" 
              : status === "In Progress" ? "#3b82f6" 
              : "#10b981";
  // Returns custom pin marker
};
```

#### Smart Filtering
```javascript
// Filter incidents by status, category, and search
const filteredIncidents = incidents.filter(incident => {
  const matchesStatus = statusFilter === "All" || incident.status === statusFilter;
  const matchesCategory = categoryFilter === "All" || incident.category === categoryFilter;
  const matchesSearch = incident.title.includes(searchQuery);
  return matchesStatus && matchesCategory && matchesSearch;
});
```

#### Priority Calculation
```javascript
const calculatePriority = (incident) => {
  const reportWeight = Math.min(incident.reportsCount * 5, 50);
  const emergencyWeight = incident.emergencyLevel * 6;
  const hoursWaiting = (Date.now() - incident.createdAt) / (1000 * 60 * 60);
  const waitingWeight = Math.min(hoursWaiting, 20);
  
  return Math.round(reportWeight + emergencyWeight + waitingWeight);
};
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  role: Enum ["public", "staff"],
  workCategory: String (staff only),
  workLocation: String (staff only),
  timestamps: true
}
```

### Incident Model
```javascript
{
  title: String,
  category: Enum [9 categories],
  description: String,
  location: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  image: String (file path),
  reportedBy: ObjectId (User),
  status: String (default: "Open"),
  upvotes: [ObjectId] (User refs),
  downvotes: [ObjectId] (User refs),
  upvoteCount: Number,
  downvoteCount: Number,
  timestamps: true
}
```

### StaffAssignment Model
```javascript
{
  incidentId: ObjectId (Incident),
  staffId: ObjectId (User),
  staffEmail: String (auto-populated),
  title: String,
  address: String,
  priority: Enum ["Low", "Medium", "High", "Critical"],
  category: String,
  assignedBy: ObjectId (User),
  assignmentStatus: Enum ["Assigned", "In Progress", "Completed", "Cancelled"],
  assignedAt: Date,
  completedAt: Date,
  notes: String,
  timestamps: true
}
```

### Indexes
- User: `email` (unique)
- StaffAssignment: `staffId + assignmentStatus`, `staffEmail + assignmentStatus`, `incidentId`

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: bcryptjs with 10 salt rounds
- **Role-Based Access**: Middleware verification for protected routes
- **Token Expiry**: 24-hour token lifetime
- **Secure Storage**: Tokens stored in localStorage

### Data Validation
- **Mongoose Schemas**: Server-side validation
- **Required Fields**: Enforced at database level
- **Email Validation**: Format checking
- **File Type**: Image-only uploads
- **File Size**: 5MB maximum
- **Input Sanitization**: XSS protection

### API Security
- **CORS**: Configured for frontend origin only
- **Rate Limiting**: Prevents spam submissions
- **Error Handling**: No sensitive data in error messages
- **Submission Limits**: 3 incidents per user
- **Duplicate Prevention**: Assignment checks before creation

## 🏆 Project Highlights

✅ **Full-Stack MERN Application**  
✅ **Role-Based Authentication System**  
✅ **Real-Time Data Updates**  
✅ **Interactive Map Integration**  
✅ **Community Voting Mechanism**  
✅ **Smart Priority Algorithm**  
✅ **Image Upload Functionality**  
✅ **Responsive Mobile Design**  
✅ **RESTful API Architecture**  
✅ **MongoDB Schema Design**  



---

**Built with ❤️ by TechSaarthi**
