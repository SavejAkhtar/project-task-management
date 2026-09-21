# Project & Task Management System API Documentation

## Base URL

http://localhost:8000/api

## Authentication

Protected APIs require:

Authorization: Bearer <JWT_TOKEN>

## User APIs

### Register User
POST /users/register

Body:
{
  "name": "Test User",
  "email": "test@gmail.com",
  "password": "123456"
}

### Login User
POST /users/login

Body:
{
  "email": "test@gmail.com",
  "password": "123456"
}

### Get Profile
GET /users/profile

### Get Team Members
GET /users/team-members

## Project APIs

### Create Project
POST /projects/create

Body:
{
  "name": "Employee Management System",
  "description": "Project description"
}

### Get Projects
GET /projects

### Update Project
PUT /projects/:id

Body:
{
  "name": "Updated Project",
  "description": "Updated description",
  "status": "active"
}

### Delete Project
DELETE /projects/:id

## Task APIs

### Create Task
POST /tasks/create

Body:
{
  "title": "Create Login Page",
  "description": "Create login page",
  "project": "PROJECT_ID",
  "assignedTo": "USER_ID",
  "priority": "high",
  "dueDate": "2026-09-30"
}

### Get Tasks
GET /tasks?page=1&limit=20

### Search Tasks
GET /tasks/search?keyword=Login

### Get My Tasks
GET /tasks/myTask

### Update Task Status
PUT /tasks/:id/status

Body:
{
  "status": "in-progress"
}

### Update Task
PUT /tasks/:id

### Delete Task
DELETE /tasks/:id