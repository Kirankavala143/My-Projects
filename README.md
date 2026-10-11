# 📝 MCQ-Based Question Management System

A full-stack web application built using the **MERN stack** to simplify the creation, management, and organization of multiple-choice questions (MCQs). The system includes secure authentication, role-based access, and an interactive interface for managing question data.

## 🚀 Project Overview

The MCQ-Based Question Management System is designed to make question management more efficient for educational platforms, quiz applications, and learning environments. It connects a React frontend with a Node.js and Express.js backend, using MongoDB to store application data.

This was developed as a **team project**, providing practical experience with full-stack application development and frontend-backend integration.

## ✨ Key Features

- 🔐 **User Authentication:** JWT-based authentication for secure access.
- 👥 **Role-Based Access Control:** Different access levels for administrators and users.
- 📝 **Question Management:** Add, edit, and delete multiple-choice questions.
- 📂 **File Uploads:** Upload files using Multer.
- 👤 **User Profile Management:** Manage and update user profile information.
- 🔄 **Frontend–Backend Integration:** Communicate with backend APIs using React and Express.js.
- 🌐 **CORS Configuration:** Support communication between the frontend and backend.
- 🧩 **Modular Architecture:** Organize application components for easier maintenance and future improvements.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Node.js | JavaScript runtime for the backend |
| Express.js | Backend APIs and request handling |
| MongoDB | Database |
| JWT | Authentication |
| Multer | File uploads |
| JavaScript | Application logic |
| CSS | User interface styling |

## 🏗️ Application Architecture

```text
User
  │
  ▼
React.js Frontend
  │
  ▼
Express.js REST APIs
  │
  ├── Authentication & Authorization
  ├── Question Management
  ├── User Profile Management
  └── File Upload Handling
  │
  ▼
MongoDB Database
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB](https://www.mongodb.com/)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Kirankavala143/My-Projects.git
cd My-Projects
```

**2. Navigate to the project folder**

The application files are currently organized inside the `team-project-main` directory.

```bash
cd team-project-main
```

**3. Install dependencies**

Run `npm install` in the frontend and backend directories that contain their respective `package.json` files.

**4. Configure environment variables**

Create the required `.env` file in the backend directory. Configure the variables expected by your application, such as:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
```

Use the exact variable names expected by your source code. Keep real credentials and secrets private.

**5. Start the application**

Run the frontend and backend using the scripts defined in their respective `package.json` files. The exact commands depend on your project configuration.

## 🎯 Use Cases

- Educational platforms
- Online quiz applications
- MCQ repositories
- Question-bank administration
- Learning and assessment systems

## 📚 What I Learned

- Building full-stack applications using the MERN stack
- Integrating React interfaces with backend APIs
- Working with MongoDB for application data
- Implementing JWT-based authentication and authorization
- Handling file uploads with Multer
- Configuring frontend–backend communication and CORS
- Collaborating on a team-based software project

## 👨‍💻 Project Information

- **Project:** MCQ-Based Question Management System
- **Type:** Full-stack web application
- **Development:** Team project
- **Repository:** [My-Projects on GitHub](https://github.com/Kirankavala143/My-Projects)

---

⭐ If you find this project interesting, feel free to explore the repository.

**Built with React, Node.js, Express.js, and MongoDB.**
