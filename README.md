Project & Task Management System

A full-stack Project & Task Management System built using the MERN stack. The application provides authentication, role-based access, project management, task assignment and task tracking.

Features

User registration and login

JWT authentication

Password hashing using bcryptjs

Role-based access control

Protected routes

Project management

Task management

Task assignment

Task status and priority management

Due date management

Task search

Task filtering

Pagination

Audit logging

REST APIs

Frontend and backend validation

User Roles

Admin

Manage projects and tasks

Access admin protected APIs

Project Manager

Create, update and delete projects

Create, update and delete tasks

Assign tasks to team members

View all tasks

Team Member

View assigned tasks

Update the status of assigned tasks

Tech Stack

Frontend

React

Vite

Tailwind CSS

Axios

React Router

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcryptjs

Project Structure

Project-Task-Management/
│
├── Server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── API_DOCUMENTATION.md
│   ├── Dockerfile
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── docker-compose.yml
├── ER-Diagram.png
└── README.md

Setup

Backend

Open the terminal and run:

cd Server
npm install
npm start

Backend URL:

http://localhost:8000

Frontend

Open another terminal and run:

cd Client
npm install
npm run dev

Frontend URL:

http://localhost:5173

Environment Variables

Create a .env file inside the Server folder:

PORT=8000
URL=mongodb://localhost:27017/projectManagement
JWT_SECRET=your_secret_key

Make sure MongoDB is running before starting the backend.

Authentication

The application uses JWT for authentication.

After login, the server generates a JWT token. Protected APIs require the token in the request header:

Authorization: Bearer <JWT_TOKEN>

Database

MongoDB is used as the database and Mongoose is used for database operations.

Main collections:

Users

Projects

Tasks

AuditLogs

Audit Logging

The application records important task operations in the AuditLog collection.

Each audit log stores:

User

Action

Entity

Entity ID

Created date

Updated date

API Documentation

The complete API documentation is available in:

Server/API_DOCUMENTATION.md

It contains the available authentication, project and task APIs.

Postman Testing

The APIs were tested using Postman.

The tested operations include:

Register User

Login User

Get Profile

Get Team Members

Create Project

Get Projects

Update Project

Delete Project

Create Task

Get Tasks

Search Tasks

Get My Tasks

Update Task Status

Update Task

Delete Task

ER Diagram

The database relationships are documented in:

ER-Diagram.png

Main relationships:

User 1 ---- N Project
User 1 ---- N Task
Project 1 - N Task
User 1 ---- N AuditLog

Validation and Error Handling

The application includes:

Required field validation

Mongoose schema validation

JWT token validation

Role-based authorization

API error handling

Docker

The backend can also be run using Docker.

docker compose up --build

Deployment

Frontend is deployed on Vercel.

Backend is deployed on Render.

MongoDB database is hosted on MongoDB Atlas.

Demo Credentials

Use these dedicated accounts for demonstration.

Admin

Email: admin@gmail.com
Password: 123456

Project Manager

Email: manager@gmail.com
Password: 123456

Team Member

Email: member@gmail.com
Password: 123456

Running the Application

Start MongoDB.

Start the backend from the Server folder.

Start the frontend from the Client folder.

Open the frontend URL in the browser.

http://localhost:5173

Author

Project & Task Management System