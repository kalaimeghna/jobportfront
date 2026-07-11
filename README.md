# 🚀 MERN Job Portal

A full-stack Job Portal application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with TypeScript, Redux Toolkit, Tailwind CSS, JWT Authentication, Cloudinary, and Multer.

---

## 📌 Features

### 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control
- Forgot Password
- Reset Password

### 💼 Job Management

- Create Job
- Update Job
- Delete Job
- View Jobs
- Search Jobs
- Filter Jobs
- Job Details Page

### 🏢 Company Management

- Create Company
- Update Company
- Company Details
- Company Listing
- Company Logo Upload

### 📄 Resume Management

- Upload Resume
- View Resume
- Download Resume
- Delete Resume

### 📬 Applications

- Apply for Jobs
- Track Application Status
- ATS Board
- Applicant Management

### 📊 Dashboard

- Employer Dashboard
- Analytics Dashboard
- Job Statistics
- Application Statistics

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- Cloudinary
- bcryptjs

---

## 📁 Project Structure

```text
MERN-Job-Portal/
│
├── frontend/
│   ├── src/
│   │
│   ├── api/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/mern-job-portal.git
```

```bash
cd mern-job-portal
```

---

## Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Backend Setup

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Environment Variables

### Backend `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name

VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

---

## API Endpoints

### Auth

```http
POST /api/auth/register
```

```http
POST /api/auth/login
```

```http
POST /api/auth/forgot-password
```

```http
POST /api/auth/reset-password/:token
```

---

### Jobs

```http
GET /api/jobs
```

```http
GET /api/jobs/:id
```

```http
POST /api/jobs
```

```http
PUT /api/jobs/:id
```

```http
DELETE /api/jobs/:id
```

---

### Companies

```http
GET /api/companies
```

```http
GET /api/companies/:id
```

```http
POST /api/companies
```

```http
PUT /api/companies/:id
```

```http
DELETE /api/companies/:id
```

---

### Applications

```http
POST /applications
```

```http
GET /applications
```

```http
PUT /applications/:id/status
```

---

### Resumes

```http
POST /resumes/upload
```

```http
GET /resumes
```

```http
DELETE /resumes/:id
```

---

## Redux Toolkit

### Auth Slice

- Login
- Register
- Logout

### Job Slice

- Fetch Jobs
- Fetch Job Details
- Create Job
- Update Job
- Delete Job

### Company Slice

- Create Company
- Update Company
- Fetch Companies

### Application Slice

- Apply Job
- Fetch Applications

### Resume Slice

- Upload Resume
- Delete Resume

---

## User Roles

### Job Seeker

- Browse Jobs
- Apply Jobs
- Upload Resume
- Manage Profile

### Employer

- Create Jobs
- Manage Jobs
- View Applicants
- Manage Company

### Admin

- Manage Users
- Manage Jobs
- Manage Companies

---

## Build for Production

Frontend:

```bash
npm run build
```

Preview build:

```bash
npm run preview
```

---

## Future Improvements

- Real-time Notifications
- Chat System
- AI Resume Analysis
- AI Job Recommendations
- Video Interviews
- Stripe Payments
- Advanced Analytics

---

## Author

**Kalai**

MERN Stack Developer

---

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.