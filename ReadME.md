# Task Management System

This project is a full-stack Task Management System developed using Node.js with TypeScript for the backend and React.js for the frontend. The system allows users to manage their tasks with Create, Read, Update, and Delete (CRUD) operations. User information is stored in a suitable database, and tasks are saved in Firebase Firestore. The frontend UI interacts with the backend API to provide a seamless user experience.

## Table of Contents

- [Installation](#installation)
- [Backend API](#backend-api)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)
  - [Security](#security)
- [Frontend UI](#frontend-ui)
  - [Usage](#usage-1)
  - [Environment Variables](#environment-variables-1)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Anas-i-okasha/warriors-Board.git
   cd backend
   npm install
   cd frontend
   npm install
   cd ..

## Backend API

## Usage 
1. **Set up environment variables:**
Create a .env file in the root directory and add the following:
    PORT=4000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=0000
    DB_NAME=warriors
    SALT=7
    JWT_SECRET=warriors

2.**Run the server:**
    npm run start

## API Endpoints
Login
    POST /login

SignUp
    POST register

GetAllUsers -- For Admins
    GET / getAllUsers

Create Task
    POST /createTask

Read Task By ID
    GET /getUserRelatedTasks/:userId

Update Task
    PUT /updateTaskStatus/:id
Delete Task
    DELETE /deleteTask/:id

## Security
1. **JWT Authentication:**
The backend API uses JSON Web Tokens (JWT) for authentication. When a user login in or authenticates, the server generates a JWT that is stored in cookie, then included in subsequent requests from the client. This token is verified on the server side to ensure that requests are coming from authenticated users only.

2. **Authorization:**
Implement authorization checks in the API endpoints to ensure that users can only access and manipulate their own tasks. This can be achieved by checking the user's identity embedded in the JWT against the task ownership or other relevant criteria before allowing CRUD operations.

## Frontend UI

## Usage
**Run the frontend application:**
 cd frontend
 npm run start

 ## Project Structure

 1. **Backend**

  ```bash
.
├── backend
│ ├── controllers
│ │ └── taskManagment.ts
│ │ └── users.ts
│ ├── baseDAO
│ │ └── baseDAO.ts
│ │ └── firebase-key.json
│ ├── routes
│ │ └── route.ts
│ ├── auth
│ │ └── auth.ts
│ ├── shared
│ │ └── validation.ts
│ │ └── types.ts
│ └── app.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md

2. **Frontend**
.
├── public
│ ├── index.html
│ └── ...
├── src
│ ├── components
│ │ └── Login
│ │ └── SignUp
│ │ └── DashBoard
│ │ └── Edit Task
│ │ └── Add Task
│ ├── App.js
│ ├── index.js
│ ├── routes.js
│ └── styles
│ └── App.css
├── .gitignore
├── package.json
├── README.md
  ```
